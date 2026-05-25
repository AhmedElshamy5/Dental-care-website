import { NextRequest } from 'next/server'
import { chatbotSystemPrompt } from '@/lib/chatbot-prompt'
import { supabase } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
// Claude 3.5 Haiku via OpenRouter (fastest/cheapest Claude model available)
const MODEL = 'anthropic/claude-3-5-haiku'

const MAX_MESSAGES = 20
const MAX_CONTENT_LEN = 2000
const ALLOWED_ROLES = new Set(['user', 'assistant'])

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, 'chat', { limit: 20, windowMs: 60 * 1000 })
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded' }),
      { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': String(limit.retryAfter) } },
    )
  }

  try {
    const { messages, language } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response('Invalid request', { status: 400 })
    }
    for (const m of messages) {
      if (!m || typeof m !== 'object'
        || typeof m.role !== 'string' || !ALLOWED_ROLES.has(m.role)
        || typeof m.content !== 'string'
        || m.content.length === 0 || m.content.length > MAX_CONTENT_LEN) {
        return new Response('Invalid message', { status: 400 })
      }
    }

    const systemPrompt =
      chatbotSystemPrompt +
      (language === 'es'
        ? '\n\nIMPORTANT: The user is writing in Spanish. Respond entirely in Spanish with the same warm, professional tone.'
        : '')

    // OpenRouter uses OpenAI-compatible format: system is a message, not a top-level param
    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
        .filter((m: { role: string; content: string }) =>
          m.role === 'user' || m.role === 'assistant'
        )
        .map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
    ]

    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://brightsmiledental.com',
        'X-Title': 'Bright Smile Dental Chatbot',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: chatMessages,
        max_tokens: 1024,
        stream: true,
      }),
    })

    if (!upstream.ok) {
      const err = await upstream.text()
      console.error('OpenRouter error:', err)
      return new Response(
        JSON.stringify({ error: 'AI service unavailable' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const encoder = new TextEncoder()
    let fullText = ''

    // Pipe OpenRouter SSE → our own SSE format the client already expects
    const readable = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        try {
          while (reader) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''   // keep incomplete last line in buffer

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed || !trimmed.startsWith('data: ')) continue

              const data = trimmed.slice(6)
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                controller.close()
                // Detect booking intent and save lead
                saveLeadIfBookingIntent(messages, fullText).catch(() => {})
                return
              }

              try {
                const parsed = JSON.parse(data)
                const text: string = parsed.choices?.[0]?.delta?.content ?? ''
                if (text) {
                  fullText += text
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                  )
                }
              } catch {
                // malformed chunk — skip
              }
            }
          }

          // Stream ended without [DONE]
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function saveLeadIfBookingIntent(
  messages: { role: string; content: string }[],
  botReply: string
) {
  const lastUser = messages[messages.length - 1]?.content?.toLowerCase() ?? ''
  const bookingKeywords = [
    'book', 'appointment', 'schedule', 'reserve',
    'name is', 'my phone', 'my email',
    'cita', 'reservar',
  ]
  const hasIntent = bookingKeywords.some(
    kw => lastUser.includes(kw) || botReply.toLowerCase().includes('confirm')
  )
  if (hasIntent) {
    await supabase.from('chatbot_inquiries').insert({
      inquiry_type: 'booking_intent',
      conversation: messages,
      contacted: false,
    })
  }
}

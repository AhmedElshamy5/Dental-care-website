'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Message } from '@/types'
import ChatMessage from './ChatMessage'

const SUGGESTED_CHIPS = [
  'Book an appointment',
  'Pricing & insurance',
  'Office hours',
  'Dental emergency',
]

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Brighty 👋 Your Bright Smile Dental assistant. How can I help you today? You can ask about services, pricing, insurance, or book an appointment.",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [showChips, setShowChips] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowChips(false)
    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language }),
      })

      if (!res.ok) throw new Error('Failed to get response')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  assistantText += parsed.text
                  setMessages(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                    return updated
                  })
                }
              } catch {}
            }
          }
        }
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm having trouble connecting right now. Please call us at (512) 555-0142 for immediate assistance." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-xl shadow-sky-300/50 flex items-center justify-center transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Pulse indicator */}
            <span className="absolute top-1 right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-white">
              <span className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-75" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] h-[560px] max-h-[calc(100vh-48px)] bg-white rounded-2xl shadow-2xl shadow-gray-400/30 flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-sky-500 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">Brighty</p>
                <p className="text-xs text-sky-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full inline-block" />
                  Online · Bright Smile Dental
                </p>
              </div>

              {/* Language toggle */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5 mr-1">
                {(['en', 'es'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                      language === lang ? 'bg-white text-sky-600' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : 'ES'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}

              {/* Suggested chips - only on first open */}
              {showChips && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_CHIPS.map(chip => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-sky-200 bg-white text-sky-700 hover:bg-sky-50 hover:border-sky-400 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-sky-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-100">
                    <div className="flex gap-1 items-center h-4">
                      {[0,1,2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-sky-400 focus-within:bg-white transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={language === 'en' ? 'Ask anything about our services…' : 'Pregunta lo que necesites…'}
                  className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200 text-white flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-1.5">
                Brighty can make mistakes · Always verify with our team
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

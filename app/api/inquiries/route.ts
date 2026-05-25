import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const inquirySchema = z.object({
  inquiry_type: z.enum(['booking_intent', 'general', 'callback', 'feedback']),
  name:         z.string().max(100).optional(),
  email:        z.string().email().max(254).optional(),
  phone:        z.string().max(30).optional(),
  message:      z.string().max(2000).optional(),
  conversation: z.array(z.object({
    role:    z.enum(['user', 'assistant', 'system']),
    content: z.string().max(4000),
  })).max(40).optional(),
})

const patchSchema = z.object({
  id:        z.string().min(1).max(100),
  contacted: z.boolean(),
})

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, 'inquiries', { limit: 10, windowMs: 60 * 60 * 1000 })
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  try {
    const body = await req.json()
    const parsed = inquirySchema.parse(body)
    const { data, error } = await supabase
      .from('chatbot_inquiries')
      .insert({ ...parsed, contacted: false })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Inquiry API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('chatbot_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ inquiries: [] })
  return NextResponse.json({ inquiries: data })
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, contacted } = patchSchema.parse(body)
    const { error } = await supabase
      .from('chatbot_inquiries')
      .update({ contacted })
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

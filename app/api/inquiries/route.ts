import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabase
      .from('chatbot_inquiries')
      .insert(body)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('chatbot_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ inquiries: [] })
  return NextResponse.json({ inquiries: data })
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, contacted } = await req.json()
    const { error } = await supabase
      .from('chatbot_inquiries')
      .update({ contacted })
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

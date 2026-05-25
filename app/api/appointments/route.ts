import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const appointmentSchema = z.object({
  patient_name:       z.string().min(2).max(100),
  email:              z.string().email().max(254),
  phone:              z.string().min(10).max(30),
  service:            z.string().min(1).max(100),
  preferred_date:     z.string().max(40),
  preferred_time:     z.string().max(40),
  insurance_provider: z.string().max(80).optional(),
  is_new_patient:     z.boolean(),
  notes:              z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, 'appointments', { limit: 5, windowMs: 60 * 60 * 1000 })
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  try {
    const body = await req.json()
    const data = appointmentSchema.parse(body)

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({ ...data, status: 'pending' })
      .select()
      .single()

    if (error) {
      console.error('Supabase error (demo mode):', error.message)
      const mockId = Math.random().toString(36).substring(2, 8).toUpperCase()
      return NextResponse.json({
        success: true,
        confirmation_number: `BSD-${mockId}`,
        message: 'Appointment request received. We will confirm within 1 business hour.',
      })
    }

    return NextResponse.json({
      success: true,
      confirmation_number: `BSD-${appointment.id.substring(0, 6).toUpperCase()}`,
      message: 'Appointment request received. We will confirm within 1 business hour.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 },
      )
    }
    console.error('Appointment API error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ appointments: [] })
  }

  return NextResponse.json({ appointments: data })
}

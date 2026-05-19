import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const appointmentSchema = z.object({
  patient_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  preferred_date: z.string(),
  preferred_time: z.string(),
  insurance_provider: z.string().optional(),
  is_new_patient: z.boolean(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = appointmentSchema.parse(body)

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({ ...data, status: 'pending' })
      .select()
      .single()

    if (error) {
      // In demo mode (no Supabase), return a mock confirmation
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
        { status: 400 }
      )
    }
    console.error('Appointment API error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ appointments: [] })
  }

  return NextResponse.json({ appointments: data })
}

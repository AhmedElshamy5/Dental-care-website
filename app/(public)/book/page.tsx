'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, addDays, isSaturday, startOfToday } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import {
  CheckCircle, ArrowRight, ArrowLeft, Calendar, User,
  Stethoscope, Clock, Phone, Mail, Shield
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { services, timeSlots, clinicData } from '@/lib/clinic-data'

const step3Schema = z.object({
  patient_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  insurance_provider: z.string().optional(),
  is_new_patient: z.boolean(),
  notes: z.string().optional(),
})

type Step3Data = z.infer<typeof step3Schema>

const insuranceOptions = ['None / Self-Pay', ...clinicData.insurance]

const steps = [
  { id: 1, label: 'Service', icon: <Stethoscope className="h-4 w-4" /> },
  { id: 2, label: 'Date & Time', icon: <Calendar className="h-4 w-4" /> },
  { id: 3, label: 'Your Info', icon: <User className="h-4 w-4" /> },
]

function BookingPageInner() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get('service') || ''

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(defaultService)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { is_new_patient: true },
  })

  const isNewPatient = watch('is_new_patient')

  const availableSlots = selectedDate && isSaturday(selectedDate)
    ? timeSlots.filter(t => {
        const hour = parseInt(t.split(':')[0])
        const isPM = t.includes('PM')
        const h24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour
        return h24 >= 9 && h24 < 14
      })
    : timeSlots

  const onSubmit = async (data: Step3Data) => {
    if (!selectedDate || !selectedTime) return
    setSubmitting(true)
    try {
      const payload = {
        ...data,
        service: selectedService || 'General Check-up',
        preferred_date: format(selectedDate, 'yyyy-MM-dd'),
        preferred_time: selectedTime,
        insurance_provider: data.insurance_provider === 'None / Self-Pay' ? undefined : data.insurance_provider,
      }
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      setConfirmation(result.confirmation_number || 'BSD-DEMO1')
    } catch {
      setConfirmation('BSD-DEMO1')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
        >
          <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-[#0369A1]" />
          </div>
          <h2 className="font-display text-4xl text-[#0C1A2E] font-normal mb-3">
            You&apos;re booked!
          </h2>
          <p className="text-slate-500 mb-6 font-body">
            We&apos;ll send a confirmation email and a reminder 24 hours before your appointment.
          </p>
          <div className="bg-slate-50 rounded-xl p-5 mb-6 text-left space-y-2">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.15em] mb-2 font-body">Appointment Summary</p>
            <div className="flex justify-between text-sm font-body">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-[#0C1A2E]">{selectedService || 'General Check-up'}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-slate-500">Date</span>
              <span className="font-semibold text-[#0C1A2E]">{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-slate-500">Time</span>
              <span className="font-semibold text-[#0C1A2E]">{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-100 font-body">
              <span className="text-slate-500">Confirmation #</span>
              <span className="font-bold text-[#0369A1]">{confirmation}</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-5 font-body">
            Questions? Call us at{' '}
            <a href={`tel:${clinicData.phone.replace(/\D/g, '')}`} className="text-[#0369A1] font-bold">
              {clinicData.phone}
            </a>
          </p>
          <Button
            asChild
            className="w-full bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl font-semibold font-body"
          >
            <a href="/">Return Home</a>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #FAFBFC 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 font-body">Online Booking</p>
          <h1 className="font-display text-5xl sm:text-6xl text-[#0C1A2E] font-normal mb-4 leading-tight">
            Book Your Appointment
          </h1>
          <p className="text-slate-500 font-body">Takes 2 minutes. Confirmation in your inbox instantly.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Step indicator — underline tabs */}
        <div className="flex items-center justify-center mb-10 border-b border-slate-100">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px font-body ${
                s.id === step
                  ? 'border-[#0369A1] text-[#0369A1]'
                  : s.id < step
                  ? 'border-[#0369A1]/30 text-[#0369A1]/60'
                  : 'border-transparent text-slate-400'
              }`}>
                {s.id < step ? <CheckCircle className="h-4 w-4" /> : s.icon}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-px mx-1 ${s.id < step ? 'bg-[#0369A1]/30' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-5">
                  What can we help you with?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {services.map(s => (
                    <button
                      key={s.slug}
                      onClick={() => setSelectedService(s.name)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all font-body ${
                        selectedService === s.name
                          ? 'border-[#0369A1] bg-sky-50 text-[#0369A1] font-semibold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="font-semibold">{s.name}</span>
                      <span className="block text-xs text-slate-400 mt-0.5">From {s.startingPrice}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedService('Other / Not Sure')}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition-all font-body ${
                      selectedService === 'Other / Not Sure'
                        ? 'border-[#0369A1] bg-sky-50 text-[#0369A1] font-semibold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="font-semibold">Other / Not Sure</span>
                    <span className="block text-xs text-slate-400 mt-0.5">We&apos;ll help figure it out</span>
                  </button>
                </div>
                <Button
                  onClick={() => step === 1 && setStep(2)}
                  disabled={!selectedService}
                  className="w-full bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl font-semibold h-11 disabled:opacity-50 font-body shadow-md shadow-sky-200/30"
                >
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-5">
                  Choose a date & time
                </h2>
                <div className="flex justify-center mb-6 border border-slate-100 rounded-2xl p-4 bg-slate-50">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={[
                      { before: addDays(startOfToday(), 1) },
                      { after: addDays(startOfToday(), 60) },
                      { dayOfWeek: [0] },
                    ]}
                    classNames={{
                      selected: '!bg-[#0369A1] !text-white !rounded-xl',
                      today: 'font-bold !text-[#0369A1]',
                    }}
                  />
                </div>
                {selectedDate && (
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5 font-body">
                      <Clock className="h-4 w-4 text-[#0369A1]" />
                      Available times for {format(selectedDate, 'EEEE, MMM d')}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 rounded-xl border text-sm transition-all font-body ${
                            selectedTime === slot
                              ? 'border-[#0369A1] bg-[#0369A1] text-white font-semibold shadow-sm'
                              : 'border-slate-200 hover:border-[#0369A1]/40 text-slate-700 hover:bg-sky-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl font-body border-slate-200">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl font-semibold disabled:opacity-50 font-body shadow-md shadow-sky-200/30"
                  >
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Patient Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-5">
                    Your information
                  </h2>
                  {/* Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm font-body">
                      <Stethoscope className="h-4 w-4 text-[#0369A1]" />
                      <span className="text-slate-700 font-semibold">{selectedService}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body">
                      <Calendar className="h-4 w-4 text-[#0369A1]" />
                      <span className="text-slate-700">{selectedDate ? format(selectedDate, 'MMM d, yyyy') : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body">
                      <Clock className="h-4 w-4 text-[#0369A1]" />
                      <span className="text-slate-700">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="patient_name" className="text-sm font-semibold text-slate-700 font-body">
                        <User className="inline h-3.5 w-3.5 mr-1 text-slate-400" />Full Name *
                      </Label>
                      <Input id="patient_name" {...register('patient_name')}
                        className={`mt-1.5 rounded-xl font-body ${errors.patient_name ? 'border-red-300' : ''}`}
                        placeholder="Jane Smith" />
                      {errors.patient_name && <p className="text-xs text-red-500 mt-1 font-body">{errors.patient_name.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 font-body">
                          <Mail className="inline h-3.5 w-3.5 mr-1 text-slate-400" />Email *
                        </Label>
                        <Input id="email" type="email" {...register('email')}
                          className={`mt-1.5 rounded-xl font-body ${errors.email ? 'border-red-300' : ''}`}
                          placeholder="jane@example.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1 font-body">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 font-body">
                          <Phone className="inline h-3.5 w-3.5 mr-1 text-slate-400" />Phone *
                        </Label>
                        <Input id="phone" type="tel" {...register('phone')}
                          className={`mt-1.5 rounded-xl font-body ${errors.phone ? 'border-red-300' : ''}`}
                          placeholder="(512) 555-0000" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1 font-body">{errors.phone.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="insurance_provider" className="text-sm font-semibold text-slate-700 font-body">
                        <Shield className="inline h-3.5 w-3.5 mr-1 text-slate-400" />Insurance Provider
                      </Label>
                      <select id="insurance_provider" {...register('insurance_provider')}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0369A1] text-slate-700 font-body">
                        <option value="">Select insurance…</option>
                        {insuranceOptions.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="is_new_patient" {...register('is_new_patient')}
                        className="w-4 h-4 rounded border-slate-300 text-[#0369A1] focus:ring-[#0369A1]"
                        defaultChecked />
                      <Label htmlFor="is_new_patient" className="text-sm text-slate-700 cursor-pointer font-body">
                        I am a new patient at Bright Smile Dental
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-sm font-semibold text-slate-700 font-body">Additional Notes</Label>
                      <Textarea id="notes" {...register('notes')}
                        className="mt-1.5 rounded-xl resize-none font-body" rows={3}
                        placeholder="Any concerns, allergies, or special requests? (optional)" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl font-body border-slate-200">
                      <ArrowLeft className="mr-1 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" disabled={submitting}
                      className="flex-1 bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl font-semibold h-11 font-body shadow-md shadow-sky-200/30">
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Booking…
                        </span>
                      ) : (
                        <>Confirm Booking <CheckCircle className="ml-1 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-4 font-body">
                    Your information is secure and will only be used for appointment scheduling.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0369A1] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingPageInner />
    </Suspense>
  )
}

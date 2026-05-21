'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, AlertTriangle, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { clinicData } from '@/lib/clinic-data'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please describe how we can help'),
})

type FormData = z.infer<typeof schema>

const hours = [
  { day: 'Monday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1200))
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #FAFBFC 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 font-body">Contact</p>
          <h1 className="font-display text-5xl sm:text-6xl text-[#0C1A2E] font-normal mb-4 leading-tight">
            We&apos;d Love to Hear
            <br />
            <em className="not-italic text-[#0369A1]">from You</em>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-body">
            Questions about a service, insurance, or your appointment? Reach out and we&apos;ll get back to you within one business hour.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency callout — flat, no oval */}
        <div className="border-l-4 border-rose-500 bg-rose-50 p-5 mb-12 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-800 mb-1 font-body">Dental Emergency?</p>
            <p className="text-sm text-rose-700 font-body">
              Don&apos;t wait — call our emergency line immediately:{' '}
              <a href={`tel:${clinicData.emergencyLine.replace(/\D/g, '')}`} className="font-bold underline">
                {clinicData.emergencyLine}
              </a>
              . Available 24/7. For life-threatening situations, call 911.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-8">
            {/* Contact details */}
            <div>
              <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-5">Reach Us</h2>
              <div className="space-y-3">
                <a
                  href={`tel:${clinicData.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-[#0369A1]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold font-body">Phone</p>
                    <p className="text-[#0C1A2E] font-bold font-body">{clinicData.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${clinicData.email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-[#0369A1]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold font-body">Email</p>
                    <p className="text-[#0C1A2E] font-bold font-body">{clinicData.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#0369A1]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold font-body">Address</p>
                    <p className="text-[#0C1A2E] font-bold font-body">{clinicData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-[#0369A1]" /> Office Hours
              </h2>
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                {hours.map((item, i) => {
                  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
                  const isToday = item.day === today
                  return (
                    <div
                      key={item.day}
                      className={`flex justify-between px-5 py-3 text-sm font-body ${
                        i < hours.length - 1 ? 'border-b border-slate-50' : ''
                      } ${isToday ? 'bg-sky-50' : ''}`}
                    >
                      <span className={`font-medium ${isToday ? 'text-[#0369A1]' : 'text-slate-600'}`}>
                        {item.day} {isToday && <span className="text-xs text-[#0369A1] ml-1">(Today)</span>}
                      </span>
                      <span className={item.hours === 'Closed' ? 'text-slate-400' : isToday ? 'text-[#0369A1] font-bold' : 'text-[#0C1A2E]'}>
                        {item.hours}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Insurance — plain text, no pills */}
            <div>
              <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-4">Accepted Insurance</h2>
              <p className="text-slate-600 font-body leading-relaxed">
                {clinicData.insurance.join(' · ')}
              </p>
              <p className="text-xs text-slate-400 mt-3 font-body">
                We&apos;ll verify your coverage before your first appointment so you know exactly what to expect.
              </p>
            </div>
          </div>

          {/* Right: Map + Form */}
          <div className="space-y-8">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.6752580523734!2d-97.7735!3d30.2502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE1JzAwLjciTiA5N8KwNDYnMjQuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bright Smile Dental location"
              />
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
              <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-5">Send a Message</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-[#0369A1] mx-auto mb-4" />
                  <p className="font-bold text-[#0C1A2E] mb-1 font-body">Message received!</p>
                  <p className="text-sm text-slate-500 font-body">We&apos;ll get back to you within one business hour.</p>
                  <Button
                    variant="outline"
                    className="mt-5 rounded-xl border-slate-200 font-body"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700 font-body">Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className={`mt-1.5 rounded-xl font-body ${errors.name ? 'border-red-300' : ''}`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 font-body">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 font-body">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="mt-1.5 rounded-xl font-body"
                        placeholder="(512) 555-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700 font-body">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`mt-1.5 rounded-xl font-body ${errors.email ? 'border-red-300' : ''}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 font-body">{errors.email.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-slate-700 font-body">Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className={`mt-1.5 rounded-xl resize-none font-body ${errors.message ? 'border-red-300' : ''}`}
                      rows={4}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 font-body">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl font-semibold h-11 font-body shadow-md shadow-sky-200/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

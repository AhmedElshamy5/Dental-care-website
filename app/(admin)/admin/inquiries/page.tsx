'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { MessageSquare, CheckCircle, TrendingUp, Calendar, ArrowLeft, Phone, User } from 'lucide-react'

interface Inquiry {
  id: string
  name?: string
  phone?: string
  email?: string
  inquiry_type?: string
  conversation: { role: string; content: string }[]
  contacted: boolean
  created_at: string
}

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    name: 'Ana Garcia',
    phone: '(512) 555-0010',
    email: 'ana@example.com',
    inquiry_type: 'booking_intent',
    conversation: [
      { role: 'user', content: 'Hola, I need to book an appointment for teeth whitening. My name is Ana Garcia.' },
      { role: 'assistant', content: 'Hi Ana! I\'d love to help you schedule a teeth whitening appointment. Could you share your phone number and preferred date?' },
      { role: 'user', content: 'My phone is (512) 555-0010. I\'d like this Saturday if possible.' },
    ],
    contacted: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    name: 'James Peterson',
    phone: '(512) 555-0020',
    email: 'james@example.com',
    inquiry_type: 'booking_intent',
    conversation: [
      { role: 'user', content: 'I have a broken tooth and I\'m in pain. Can I come in today?' },
      { role: 'assistant', content: 'I\'m so sorry to hear that! Yes, we have same-day emergency slots. Can I get your name and the best number to reach you?' },
      { role: 'user', content: 'James Peterson, (512) 555-0020. Please call ASAP.' },
    ],
    contacted: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '3',
    name: 'Maria Torres',
    phone: '(512) 555-0030',
    inquiry_type: 'pricing',
    conversation: [
      { role: 'user', content: 'How much do dental implants cost?' },
      { role: 'assistant', content: 'Great question! Single dental implants at Bright Smile Dental start at $3,200 and go up to around $5,000 depending on complexity...' },
      { role: 'user', content: 'That sounds reasonable. My name is Maria Torres, can someone call me to discuss financing options? (512) 555-0030' },
    ],
    contacted: false,
    created_at: new Date(Date.now() - 10800000).toISOString(),
  },
]

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES)
  const [selected, setSelected] = useState<Inquiry | null>(null)

  useEffect(() => {
    fetch('/api/inquiries').then(r => r.json()).then(d => {
      if (d.inquiries?.length) setInquiries([...MOCK_INQUIRIES, ...d.inquiries])
    }).catch(() => {})
  }, [])

  const markContacted = async (id: string, contacted: boolean) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, contacted } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, contacted } : null)
    try {
      await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, contacted }),
      })
    } catch {}
  }

  const typeColor: Record<string, string> = {
    booking_intent: 'bg-sky-50 text-sky-700 border-sky-200',
    pricing: 'bg-amber-50 text-amber-700 border-amber-200',
    emergency: 'bg-red-50 text-red-700 border-red-200',
    general: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-sky-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Chatbot Inquiries</h1>
        <nav className="ml-6 flex gap-2 flex-wrap">
          {[
            { href: '/admin', label: 'Dashboard', icon: <TrendingUp className="h-3.5 w-3.5" /> },
            { href: '/admin/appointments', label: 'Appointments', icon: <Calendar className="h-3.5 w-3.5" /> },
            { href: '/admin/inquiries', label: 'Inquiries', icon: <MessageSquare className="h-3.5 w-3.5" /> },
          ].map(l => (
            <Link key={l.href} href={l.href} className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600 px-2 py-1">
              {l.icon}{l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
            {inquiries.filter(i => !i.contacted).length} uncontacted
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            {inquiries.map(inq => (
              <button
                key={inq.id}
                onClick={() => setSelected(inq)}
                className={`w-full text-left bg-white rounded-2xl border p-4 transition-all ${
                  selected?.id === inq.id ? 'border-sky-300 shadow-sm' : 'border-gray-100 hover:border-gray-200'
                } ${!inq.contacted ? 'ring-1 ring-amber-200' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{inq.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{format(new Date(inq.created_at), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                  {!inq.contacted && (
                    <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${typeColor[inq.inquiry_type || 'general']}`}>
                  {(inq.inquiry_type || 'general').replace('_', ' ')}
                </span>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {inq.conversation[inq.conversation.length - 1]?.content}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selected.name || 'Anonymous'}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {selected.phone && (
                        <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="flex items-center gap-1 text-xs text-sky-600 hover:underline">
                          <Phone className="h-3 w-3" />{selected.phone}
                        </a>
                      )}
                      {selected.email && (
                        <span className="text-xs text-gray-500">{selected.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selected.contacted ? (
                      <button
                        onClick={() => markContacted(selected.id, true)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" /> Mark Contacted
                      </button>
                    ) : (
                      <button
                        onClick={() => markContacted(selected.id, false)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-medium transition-colors"
                      >
                        Mark Uncontacted
                      </button>
                    )}
                  </div>
                </div>

                {/* Conversation */}
                <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto bg-gray-50/50">
                  {selected.conversation.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 self-end text-xs font-bold text-sky-600">B</div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-sky-500 text-white rounded-tr-sm'
                          : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 self-end">
                          <User className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-white">
                  <p className="text-xs text-gray-400">
                    Received {format(new Date(selected.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
                    {selected.contacted && ' · Marked as contacted'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Select an inquiry to view the conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, TrendingUp, MessageSquare, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'

interface Appointment {
  id: string
  patient_name: string
  email: string
  phone: string
  service: string
  preferred_date: string
  preferred_time: string
  insurance_provider?: string
  is_new_patient: boolean
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}

const MOCK: Appointment[] = [
  { id: '1', patient_name: 'Jennifer Martinez', email: 'jen@ex.com', phone: '(512) 555-0001', service: 'General Dentistry', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '9:00 AM', insurance_provider: 'Delta Dental', status: 'confirmed', is_new_patient: true, created_at: new Date().toISOString() },
  { id: '2', patient_name: 'Marcus Johnson', email: 'marcus@ex.com', phone: '(512) 555-0002', service: 'Teeth Whitening', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '10:30 AM', insurance_provider: 'Aetna', status: 'confirmed', is_new_patient: false, created_at: new Date().toISOString() },
  { id: '3', patient_name: 'Sofia Rodriguez', email: 'sofia@ex.com', phone: '(512) 555-0003', service: 'Pediatric Dentistry', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '1:00 PM', insurance_provider: 'Cigna', status: 'pending', is_new_patient: true, created_at: new Date().toISOString() },
  { id: '4', patient_name: 'David Kim', email: 'david@ex.com', phone: '(512) 555-0004', service: 'Invisalign', preferred_date: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'), preferred_time: '2:00 PM', status: 'pending', is_new_patient: true, created_at: new Date().toISOString() },
  { id: '5', patient_name: 'Rachel Brown', email: 'rachel@ex.com', phone: '(512) 555-0005', service: 'Emergency Care', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '4:00 PM', insurance_provider: 'MetLife', status: 'confirmed', is_new_patient: false, created_at: new Date().toISOString() },
  { id: '6', patient_name: 'Thomas Lee', email: 'thomas@ex.com', phone: '(512) 555-0006', service: 'Dental Implants', preferred_date: format(new Date(Date.now() + 172800000), 'yyyy-MM-dd'), preferred_time: '11:00 AM', status: 'pending', is_new_patient: true, notes: 'Needs bone density evaluation first', created_at: new Date(Date.now() - 3600000).toISOString() },
]

const statusColor: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-lime-50 text-lime-700 border-lime-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK)
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Appointment | null>(null)

  useEffect(() => {
    fetch('/api/appointments').then(r => r.json()).then(d => {
      if (d.appointments?.length) setAppointments(d.appointments)
    }).catch(() => {})
  }, [])

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)

  const updateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-sky-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Appointments</h1>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Table */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                    filter === f ? 'bg-sky-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date/Time</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Service</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(apt => (
                      <tr
                        key={apt.id}
                        onClick={() => setSelected(apt)}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected?.id === apt.id ? 'bg-sky-50/50' : ''}`}
                      >
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-gray-900 text-xs">{format(new Date(apt.preferred_date + 'T12:00'), 'MMM d')}</p>
                          <p className="text-gray-500 text-xs">{apt.preferred_time}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-gray-900">{apt.patient_name}</p>
                          {apt.is_new_patient && <span className="text-xs text-sky-600">New</span>}
                        </td>
                        <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell text-xs">{apt.service}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColor[apt.status]}`}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="lg:col-span-1">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{selected.patient_name}</h3>
                    {selected.is_new_patient && (
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">New Patient</span>
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusColor[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service</span>
                    <span className="font-medium text-gray-900">{selected.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-900">{format(new Date(selected.preferred_date + 'T12:00'), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-900">{selected.preferred_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <a href={`mailto:${selected.email}`} className="text-sky-600 hover:underline font-medium truncate max-w-[150px]">{selected.email}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="text-sky-600 hover:underline font-medium">{selected.phone}</a>
                  </div>
                  {selected.insurance_provider && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insurance</span>
                      <span className="font-medium text-gray-900">{selected.insurance_provider}</span>
                    </div>
                  )}
                  {selected.notes && (
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 mt-2">
                      <p className="text-xs text-amber-700 font-medium mb-1">Notes</p>
                      <p className="text-xs text-gray-700">{selected.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {selected.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(selected.id, 'confirmed')}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" /> Confirm Appointment
                    </button>
                  )}
                  {selected.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(selected.id, 'completed')}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" /> Mark Completed
                    </button>
                  )}
                  <button
                    onClick={() => updateStatus(selected.id, 'pending')}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-sm font-medium border border-amber-200 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" /> Mark Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, 'cancelled')}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-sm font-medium border border-red-200 transition-colors"
                  >
                    <XCircle className="h-4 w-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select an appointment to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

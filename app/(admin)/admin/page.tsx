'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Calendar, MessageSquare, Users, TrendingUp, Clock,
  CheckCircle, AlertCircle, LogOut, Menu, X
} from 'lucide-react'
import { format } from 'date-fns'

interface AppointmentRow {
  id: string
  patient_name: string
  service: string
  preferred_date: string
  preferred_time: string
  insurance_provider?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  is_new_patient: boolean
  email: string
  phone: string
  created_at: string
}

const MOCK_APPOINTMENTS: AppointmentRow[] = [
  { id: '1', patient_name: 'Jennifer Martinez', service: 'General Dentistry', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '9:00 AM', insurance_provider: 'Delta Dental', status: 'confirmed', is_new_patient: true, email: 'jennifer@example.com', phone: '(512) 555-0001', created_at: new Date().toISOString() },
  { id: '2', patient_name: 'Marcus Johnson', service: 'Teeth Whitening', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '10:30 AM', insurance_provider: 'Aetna', status: 'confirmed', is_new_patient: false, email: 'marcus@example.com', phone: '(512) 555-0002', created_at: new Date().toISOString() },
  { id: '3', patient_name: 'Sofia Rodriguez', service: 'Pediatric Dentistry', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '1:00 PM', insurance_provider: 'Cigna', status: 'pending', is_new_patient: true, email: 'sofia@example.com', phone: '(512) 555-0003', created_at: new Date().toISOString() },
  { id: '4', patient_name: 'David Kim', service: 'Invisalign', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '2:30 PM', status: 'pending', is_new_patient: true, email: 'david@example.com', phone: '(512) 555-0004', created_at: new Date().toISOString() },
  { id: '5', patient_name: 'Rachel Brown', service: 'Emergency Care', preferred_date: format(new Date(), 'yyyy-MM-dd'), preferred_time: '4:00 PM', insurance_provider: 'MetLife', status: 'confirmed', is_new_patient: false, email: 'rachel@example.com', phone: '(512) 555-0005', created_at: new Date().toISOString() },
]

const statusColor: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-lime-50 text-lime-700 border-lime-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>(MOCK_APPOINTMENTS)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/appointments')
      .then(r => r.json())
      .then(d => { if (d.appointments?.length) setAppointments(d.appointments) })
      .catch(() => {})
  }, [])

  const todayCount = appointments.filter(a => a.preferred_date === format(new Date(), 'yyyy-MM-dd')).length
  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const newPatients = appointments.filter(a => a.is_new_patient).length

  const stats = [
    { label: "Today's Appointments", value: todayCount, icon: <Calendar className="h-5 w-5" />, color: 'bg-sky-500', change: '+2 from yesterday' },
    { label: 'Pending Confirmations', value: pendingCount, icon: <AlertCircle className="h-5 w-5" />, color: 'bg-amber-500', change: 'Needs attention' },
    { label: 'Chatbot Inquiries', value: 3, icon: <MessageSquare className="h-5 w-5" />, color: 'bg-violet-500', change: '1 new lead' },
    { label: 'New Patients This Month', value: newPatients, icon: <Users className="h-5 w-5" />, color: 'bg-lime-500', change: '+18% vs last month' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-800">
          <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Bright Smile
          </span>
          <button className="ml-auto text-gray-400 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard', icon: <TrendingUp className="h-4 w-4" /> },
            { href: '/admin/appointments', label: 'Appointments', icon: <Calendar className="h-4 w-4" /> },
            { href: '/admin/inquiries', label: 'Inquiries', icon: <MessageSquare className="h-4 w-4" /> },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {link.icon}{link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4">
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className={`w-9 h-9 ${stat.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-400">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Today's appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Today&apos;s Schedule</h2>
              <Link href="/admin/appointments" className="text-sm text-sky-600 hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Service</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Insurance</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments
                    .filter(a => a.preferred_date === format(new Date(), 'yyyy-MM-dd'))
                    .map(apt => (
                      <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{apt.preferred_time}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{apt.patient_name}</p>
                            {apt.is_new_patient && (
                              <span className="text-xs text-sky-600 font-medium">New patient</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{apt.service}</td>
                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{apt.insurance_provider || '—'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusColor[apt.status]}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'confirmed' } : a))}
                              className="flex items-center gap-1 text-xs font-medium text-lime-700 bg-lime-50 hover:bg-lime-100 px-3 py-1.5 rounded-full transition-colors"
                            >
                              <CheckCircle className="h-3.5 w-3.5" /> Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

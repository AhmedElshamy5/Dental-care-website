'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Sparkles, Sun, AlignCenter, Anchor, AlertCircle, Heart, Activity } from 'lucide-react'
import { services } from '@/lib/clinic-data'
import type { Service } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  tooth: <CheckCircle className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
  sun: <Sun className="h-6 w-6" />,
  aligncenter: <AlignCenter className="h-6 w-6" />,
  anchor: <Anchor className="h-6 w-6" />,
  alertcircle: <AlertCircle className="h-6 w-6" />,
  heart: <Heart className="h-6 w-6" />,
  activity: <Activity className="h-6 w-6" />,
}

const gradientMap: Record<string, string> = {
  tooth: 'from-[#0369A1] to-[#38BDF8]',
  sparkles: 'from-violet-600 to-purple-400',
  sun: 'from-amber-500 to-yellow-400',
  aligncenter: 'from-emerald-600 to-teal-400',
  anchor: 'from-blue-700 to-blue-400',
  alertcircle: 'from-rose-600 to-red-400',
  heart: 'from-pink-600 to-rose-400',
  activity: 'from-orange-600 to-amber-400',
}

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'family', label: 'Family' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'specialty', label: 'Specialty' },
]

function ServiceCard({ service, i }: { service: Service; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.07 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group block h-full bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 p-6"
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientMap[service.icon]} flex items-center justify-center mb-5 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {iconMap[service.icon]}
        </div>
        <h3 className="text-lg font-bold text-[#0C1A2E] group-hover:text-[#0369A1] transition-colors mb-1 font-body">
          {service.name}
        </h3>
        <p className="font-display text-2xl font-normal text-[#0369A1] mb-3">
          {service.startingPrice}
          <span className="text-sm font-body font-normal text-slate-400 ml-1">starting</span>
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 font-body">{service.shortDescription}</p>
        <div className="flex items-center gap-1.5 text-sm font-bold text-[#0369A1] group-hover:gap-2.5 transition-all duration-200">
          Book This Service <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? services : services.filter(s => s.category === active)

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #FAFBFC 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 font-body">Services</p>
            <h1 className="font-display text-5xl sm:text-6xl text-[#0C1A2E] font-normal mb-5 leading-tight">
              Comprehensive Dental Care
              <br />
              <em className="not-italic text-[#0369A1]">for Every Stage of Life</em>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
              Eight core services — from your first check-up to a complete smile transformation. All under one welcoming roof in Austin, TX.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs — underline style, no pills */}
          <div className="flex flex-wrap gap-1 justify-center mb-10 border-b border-slate-100">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px font-body ${
                  active === cat.id
                    ? 'border-[#0369A1] text-[#0369A1]'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((service, i) => (
              <ServiceCard key={service.slug} service={service} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Insurance strip */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-5 font-body">We Accept</p>
          <p className="text-slate-600 font-body text-base leading-relaxed">
            Delta Dental · Aetna · Cigna · MetLife · Humana · Guardian · United Healthcare · Blue Cross Blue Shield
          </p>
          <p className="text-sm text-slate-400 mt-4 font-body">
            Not sure about your coverage?{' '}
            <Link href="/contact" className="text-[#0369A1] hover:underline font-semibold">Contact us</Link>{' '}
            and we&apos;ll verify your benefits before your visit.
          </p>
        </div>
      </section>
    </>
  )
}

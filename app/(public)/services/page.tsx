'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles, Sun, AlignCenter, Anchor, AlertCircle, Heart, Activity } from 'lucide-react'
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

const colorMap: Record<string, string> = {
  tooth: 'bg-sky-50 text-sky-600',
  sparkles: 'bg-violet-50 text-violet-600',
  sun: 'bg-amber-50 text-amber-600',
  aligncenter: 'bg-lime-50 text-lime-600',
  anchor: 'bg-blue-50 text-blue-600',
  alertcircle: 'bg-red-50 text-red-600',
  heart: 'bg-pink-50 text-pink-600',
  activity: 'bg-orange-50 text-orange-600',
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
        className="group block h-full bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 p-6"
      >
        <div className={`w-12 h-12 rounded-xl ${colorMap[service.icon]} flex items-center justify-center mb-4`}>
          {iconMap[service.icon]}
        </div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
            {service.name}
          </h3>
        </div>
        <p className="text-2xl font-normal text-sky-600 mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          {service.startingPrice}
          <span className="text-sm font-normal text-gray-400 ml-1">starting</span>
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.shortDescription}</p>
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-full transition-colors">
          Book This Service <ArrowRight className="h-3.5 w-3.5" />
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
      <section className="pt-28 pb-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-3">Services</p>
            <h1
              className="text-4xl sm:text-5xl text-gray-900 font-normal mb-5"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Comprehensive Dental Care
              <br />
              for Every Stage of Life
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Eight core services — from your first check-up to a complete smile transformation. All under one welcoming roof in Austin, TX.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">We Accept</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Delta Dental', 'Aetna', 'Cigna', 'MetLife', 'Humana', 'Guardian', 'United Healthcare', 'Blue Cross Blue Shield'].map(ins => (
              <span key={ins} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                {ins}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Not sure about your coverage?{' '}
            <Link href="/contact" className="text-sky-600 hover:underline font-medium">Contact us</Link> and we&apos;ll verify your benefits before your visit.
          </p>
        </div>
      </section>
    </>
  )
}

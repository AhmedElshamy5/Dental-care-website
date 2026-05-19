'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, Sparkles, Sun, AlignCenter,
  Anchor, AlertCircle, Heart, Activity, ArrowRight
} from 'lucide-react'
import { services } from '@/lib/clinic-data'

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
  tooth: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
  sparkles: 'bg-violet-50 text-violet-600 group-hover:bg-violet-100',
  sun: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
  aligncenter: 'bg-lime-50 text-lime-600 group-hover:bg-lime-100',
  anchor: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
  alertcircle: 'bg-red-50 text-red-600 group-hover:bg-red-100',
  heart: 'bg-pink-50 text-pink-600 group-hover:bg-pink-100',
  activity: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
}

const featuredSlugs = [
  'general-dentistry',
  'cosmetic-dentistry',
  'teeth-whitening',
  'invisalign',
  'dental-implants',
  'emergency-care',
]

export default function ServicesGrid() {
  const featured = services.filter(s => featuredSlugs.includes(s.slug))

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal mb-4"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Care for Every Smile,
            <br />
            Every Stage of Life
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From routine cleanings to complete smile transformations — we offer the full spectrum of modern dental care under one roof.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${colorMap[service.icon]}`}>
                  {iconMap[service.icon]}
                </div>

                {/* Content */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    From {service.startingPrice}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                <div className="flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 border border-sky-200 hover:border-sky-400 bg-sky-50 hover:bg-sky-100 px-6 py-2.5 rounded-full transition-all"
          >
            View All 8 Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

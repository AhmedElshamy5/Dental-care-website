'use client'

import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  CheckCircle, Sparkles, Sun, AlignCenter,
  Anchor, AlertCircle, Heart, Activity, ArrowUpRight
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

const shadowMap: Record<string, string> = {
  tooth: 'shadow-sky-200/70',
  sparkles: 'shadow-violet-200/70',
  sun: 'shadow-amber-200/70',
  aligncenter: 'shadow-emerald-200/70',
  anchor: 'shadow-blue-200/70',
  alertcircle: 'shadow-red-200/70',
  heart: 'shadow-pink-200/70',
  activity: 'shadow-orange-200/70',
}

const featuredSlugs = [
  'general-dentistry',
  'cosmetic-dentistry',
  'teeth-whitening',
  'invisalign',
  'dental-implants',
  'emergency-care',
]

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ServicesGrid() {
  const featured = services.filter(s => featuredSlugs.includes(s.slug))

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4">
            What We Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C1A2E] font-normal mb-5 leading-tight">
            Care for Every Smile,
            <br />
            <em className="not-italic text-[#0369A1]">Every Stage of Life</em>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
            From routine cleanings to complete smile transformations — we offer the full spectrum of modern dental care under one roof.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-7 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-400 relative overflow-hidden"
                >
                  {/* Hover gradient fill */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.035] transition-opacity duration-500 bg-gradient-to-br from-[#0369A1] to-[#38BDF8]" />

                  {/* Icon */}
                  <div
                    className={`relative w-13 h-13 rounded-2xl bg-gradient-to-br ${gradientMap[service.icon]} flex items-center justify-center mb-6 text-white shadow-lg ${shadowMap[service.icon]} group-hover:scale-110 transition-transform duration-300`}
                    style={{ width: 52, height: 52 }}
                  >
                    {iconMap[service.icon]}
                  </div>

                  {/* Content */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#0C1A2E] group-hover:text-[#0369A1] transition-colors duration-200 font-body">
                      {service.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#0369A1] bg-sky-50 px-2.5 py-1 rounded-full ml-2 flex-shrink-0 border border-sky-100">
                      From {service.startingPrice}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-5 font-body">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#0369A1] group-hover:gap-2.5 transition-all duration-300">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 text-sm font-bold text-[#0369A1] hover:text-white bg-sky-50 hover:bg-[#0369A1] border border-sky-200 hover:border-[#0369A1] px-7 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-sky-200/60"
          >
            View All 8 Services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clinicData } from '@/lib/clinic-data'

const perks = [
  'New patients always welcome',
  'Same-day appointments available',
  'Most insurance plans accepted',
]

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden text-center p-10 sm:p-16"
        >
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'linear-gradient(135deg, #0C1A2E 0%, #0369A1 40%, #0284C7 65%, #B45309 100%)',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 8s ease infinite',
            }}
          />

          {/* Overlay pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Decorative orbs */}
          <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #B45309 0%, transparent 70%)' }} />

          {/* Content */}
          <p className="text-xs font-bold text-sky-300 uppercase tracking-[0.2em] mb-6">
            Ready to Get Started?
          </p>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-normal mb-6 leading-tight">
            Ready to smile brighter?
            <br />
            <em className="not-italic text-sky-300">Book your visit today.</em>
          </h2>

          {/* Perks */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-sky-100 font-body font-medium"
              >
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                {perk}
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA with pulse ring */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-white/30"
                style={{ animation: 'pulse-ring 2.5s ease-out infinite' }}
              />
              <Button
                asChild
                size="lg"
                className="relative bg-white hover:bg-sky-50 text-[#0369A1] hover:text-[#025585] rounded-full px-10 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-base h-13 border-0"
                style={{ height: 52 }}
              >
                <Link href="/book">
                  Book Online — It&apos;s Free
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
            </div>

            <a
              href={`tel:${clinicData.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2.5 text-base font-semibold text-white/90 hover:text-white transition-colors duration-200 font-body"
            >
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                <Phone className="h-4 w-4" />
              </div>
              {clinicData.phone}
            </a>
          </div>

          <p className="mt-8 text-xs text-sky-300/70 font-body">
            Office hours: Mon–Wed 8am–6pm · Thu 8am–7pm · Fri 8am–5pm · Sat 9am–2pm
          </p>
        </motion.div>
      </div>
    </section>
  )
}

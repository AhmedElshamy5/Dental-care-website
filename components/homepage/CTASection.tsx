'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clinicData } from '@/lib/clinic-data'

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-sky-50 via-white to-lime-50 rounded-3xl p-10 sm:p-16 border border-sky-100 shadow-sm"
        >
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-4">
            Ready to Get Started?
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal mb-5"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Ready to smile brighter?
            <br />
            <span className="text-sky-500">Book your visit today.</span>
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            New patients always welcome. Same-day appointments available. Most insurance plans accepted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-10 font-medium shadow-md shadow-sky-200 text-base h-12"
            >
              <Link href="/book">
                Book Online — It&apos;s Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <a
              href={`tel:${clinicData.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 text-base font-medium text-gray-700 hover:text-sky-600 transition-colors"
            >
              <Phone className="h-4 w-4 text-sky-500" />
              {clinicData.phone}
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Office hours: Mon–Wed 8am–6pm · Thu 8am–7pm · Fri 8am–5pm · Sat 9am–2pm
          </p>
        </motion.div>
      </div>
    </section>
  )
}

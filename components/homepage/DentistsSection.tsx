'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Award, ArrowRight } from 'lucide-react'
import { dentists } from '@/lib/clinic-data'

export default function DentistsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
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
            Meet the Team
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Dentists Who Actually
            <br />
            Listen to You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {dentists.map((dentist, i) => (
            <motion.div
              key={dentist.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Photo area */}
              <div className="relative h-64 sm:h-72 bg-gradient-to-br from-sky-100 to-sky-50">
                <Image
                  src={dentist.image}
                  alt={`${dentist.name} — ${dentist.title}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-white/95 rounded-xl px-3 py-2 text-center shadow-sm">
                  <p className="text-xl font-bold text-sky-600">{dentist.yearsExperience}+</p>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">yrs<br />exp.</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="mb-4">
                  <h3
                    className="text-2xl text-gray-900 mb-0.5"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {dentist.name}
                  </h3>
                  <p className="text-sm font-medium text-sky-600">{dentist.title}</p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                  {dentist.bio}
                </p>

                {/* Credentials preview */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{dentist.education[0]}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{dentist.credentials[0]}</p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Full bio & credentials <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

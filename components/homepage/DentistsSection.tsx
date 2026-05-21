'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Award, ArrowUpRight, Star } from 'lucide-react'
import { dentists } from '@/lib/clinic-data'

export default function DentistsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 px-4 py-1.5 bg-sky-50 rounded-full border border-sky-100">
            Meet the Team
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C1A2E] font-normal leading-tight">
            Dentists Who Actually
            <br />
            <em className="not-italic text-[#0369A1]">Listen to You</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {dentists.map((dentist, i) => (
            <motion.div
              key={dentist.id}
              initial={{ opacity: 0, x: i === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-sky-100/60 hover:border-sky-100 transition-all duration-500"
            >
              {/* Photo area */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-sky-100 to-sky-50">
                <Image
                  src={dentist.image}
                  alt={`${dentist.name} — ${dentist.title}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E]/40 via-transparent to-transparent" />

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2.5 text-center shadow-lg border border-white"
                >
                  <p className="text-2xl font-bold text-[#0369A1] font-display leading-none">{dentist.yearsExperience}+</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Years exp.</p>
                </motion.div>

                {/* Rating overlay */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-white text-xs font-bold ml-1">5.0</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="mb-4">
                  <h3 className="font-display text-2xl text-[#0C1A2E] mb-1">{dentist.name}</h3>
                  <p className="text-sm font-semibold text-[#0369A1] font-body tracking-wide">{dentist.title}</p>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3 font-body">
                  {dentist.bio}
                </p>

                {/* Credentials */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[#0369A1]" />
                    </div>
                    <p className="text-xs text-slate-600 font-body">{dentist.education[0]}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <p className="text-xs text-slate-600 font-body">{dentist.credentials[0]}</p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0369A1] hover:text-[#025585] transition-colors duration-200 group/link font-body"
                >
                  Full bio & credentials
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Calendar, Shield, Languages, Award } from 'lucide-react'

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Same-Day Appointments',
    description: 'Dental emergency? Need to be seen today? We hold slots every morning for urgent and same-day bookings.',
    gradient: 'from-[#0369A1] to-[#38BDF8]',
    glow: 'shadow-sky-300/40',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Insurance Accepted',
    description: 'We\'re in-network with 8 major insurance providers including Delta Dental, Aetna, Cigna, and MetLife.',
    gradient: 'from-emerald-600 to-teal-400',
    glow: 'shadow-emerald-200/50',
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: 'Bilingual Staff',
    description: 'Dr. Walker and several team members are fluent in Spanish. We proudly serve all of Austin\'s communities.',
    gradient: 'from-violet-600 to-purple-400',
    glow: 'shadow-violet-200/50',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: '15+ Years of Excellence',
    description: 'Dr. Chen and Dr. Walker bring over 15 years of combined experience and advanced specialty training.',
    gradient: 'from-amber-600 to-yellow-400',
    glow: 'shadow-amber-200/50',
  },
]

function AnimatedCounter({
  target, suffix = '', prefix = ''
}: {
  target: number; suffix?: string; prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, count, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #F8FAFF 0%, #FAFBFC 60%, #F0F9FF 100%)' }}>
      {/* Subtle background circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0369A1 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 px-4 py-1.5 bg-sky-50 rounded-full border border-sky-100">
              Why Bright Smile
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C1A2E] font-normal mb-6 leading-tight">
              Dental Care That<br />
              <em className="not-italic text-[#0369A1]">Feels Different</em>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 font-body">
              We built Bright Smile Dental around one simple belief: going to the dentist should feel as comfortable as visiting a trusted friend who happens to have excellent equipment.
            </p>

            {/* Animated stats */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-slate-100">
              {[
                { target: 800, suffix: '+', label: 'Happy patients' },
                { target: 98, suffix: '%', label: 'Would recommend' },
                { target: 49, suffix: '', prefix: '', label: 'Google rating', display: '4.9★' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="text-center"
                >
                  <p className="font-display text-3xl sm:text-4xl font-normal text-[#0369A1] mb-1">
                    {stat.label === 'Google rating' ? (
                      <span>4.9★</span>
                    ) : (
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold font-body tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg ${feature.glow} mb-5`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-[#0C1A2E] mb-2 font-body">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-body">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

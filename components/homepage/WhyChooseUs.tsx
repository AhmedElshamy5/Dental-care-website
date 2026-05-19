'use client'

import { motion } from 'framer-motion'
import { Calendar, Shield, Languages, Award } from 'lucide-react'

const features = [
  {
    icon: <Calendar className="h-7 w-7" />,
    title: 'Same-Day Appointments',
    description: 'Dental emergency? Need to be seen today? We hold slots every morning for urgent and same-day bookings.',
    color: 'from-sky-500 to-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'Insurance Accepted',
    description: 'We\'re in-network with 8 major insurance providers including Delta Dental, Aetna, Cigna, and MetLife.',
    color: 'from-lime-500 to-lime-600',
    bg: 'bg-lime-50',
  },
  {
    icon: <Languages className="h-7 w-7" />,
    title: 'Bilingual Staff',
    description: 'Dr. Walker and several team members are fluent in Spanish. We proudly serve all of Austin\'s communities.',
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: '15+ Years of Excellence',
    description: 'Dr. Chen and Dr. Walker bring over 15 years of combined experience and advanced specialty training.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-3">
              Why Bright Smile
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-normal mb-6"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Dental Care That
              <br />
              Feels Different
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              We built Bright Smile Dental around one simple belief: going to the dentist should feel as comfortable as visiting a trusted friend who happens to have excellent equipment.
            </p>
            <div className="grid grid-cols-3 gap-6 py-8 border-t border-b border-gray-100">
              {[
                { value: '800+', label: 'Happy patients' },
                { value: '98%', label: 'Would recommend' },
                { value: '4.9★', label: 'Google rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-3xl font-normal text-sky-600 mb-1"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${feature.bg} rounded-2xl p-6 hover:shadow-sm transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-sm mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

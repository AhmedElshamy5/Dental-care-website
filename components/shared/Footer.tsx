'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { clinicData } from '@/lib/clinic-data'

const quickLinks = [
  { href: '/services', label: 'All Services' },
  { href: '/services/general-dentistry', label: 'General Dentistry' },
  { href: '/services/cosmetic-dentistry', label: 'Cosmetic Dentistry' },
  { href: '/services/dental-implants', label: 'Dental Implants' },
  { href: '/services/invisalign', label: 'Invisalign' },
  { href: '/services/teeth-whitening', label: 'Teeth Whitening' },
  { href: '/services/pediatric-dentistry', label: 'Pediatric Dentistry' },
  { href: '/services/emergency-care', label: 'Emergency Care' },
]

const officeHours = [
  { day: 'Mon – Wed', hours: '8:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Footer() {
  return (
    <footer className="bg-[#0C1A2E] text-slate-300">
      {/* Emergency banner */}
      <div className="bg-rose-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-semibold font-body">
          <span>Dental Emergency? We have same-day appointments.</span>
          <a
            href={`tel:${clinicData.emergencyLine.replace(/\D/g, '')}`}
            className="font-black underline underline-offset-2 hover:text-rose-100 transition-colors"
          >
            Call {clinicData.emergencyLine} Now
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={colVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369A1] to-[#38BDF8] flex items-center justify-center shadow-lg shadow-sky-900/40">
                <span className="text-white font-bold font-display text-base">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold text-white font-display">Bright Smile</span>
                <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-[0.2em]">Dental</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-body">
              Modern dentistry for Austin families. Trusted care, advanced technology, and a team that genuinely cares about your smile.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={clinicData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0369A1] flex items-center justify-center border border-white/10 hover:border-[#0369A1] transition-all duration-300"
                aria-label="Facebook"
              >
                <span className="text-sm font-black text-slate-300">f</span>
              </a>
              <a
                href={clinicData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0369A1] flex items-center justify-center border border-white/10 hover:border-[#0369A1] transition-all duration-300"
                aria-label="Instagram"
              >
                <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-5 font-body">Services</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors duration-200 font-body flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#38BDF8] transition-all duration-300 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={colVariants}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-5 font-body">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
                </div>
                <span className="text-sm text-slate-400 font-body leading-relaxed">{clinicData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone className="h-3.5 w-3.5 text-[#38BDF8]" />
                </div>
                <a href={`tel:${clinicData.phone.replace(/\D/g, '')}`}
                  className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors font-body">
                  {clinicData.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="h-3.5 w-3.5 text-[#38BDF8]" />
                </div>
                <a href={`mailto:${clinicData.email}`}
                  className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors font-body">
                  {clinicData.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-slate-500 font-semibold mb-2 font-body">Accepted Insurance</p>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                Delta Dental · Aetna · Cigna · MetLife · Humana · Guardian · United Healthcare · Blue Cross
              </p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div variants={colVariants}>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-5 font-body flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#38BDF8]" />
              Office Hours
            </h3>
            <ul className="space-y-2.5">
              {officeHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm font-body">
                  <span className="text-slate-400">{item.day}</span>
                  <span className={item.hours === 'Closed' ? 'text-slate-600' : 'text-slate-300 font-medium'}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs text-rose-400 font-bold mb-1 font-body">24/7 Emergency Line</p>
              <a
                href={`tel:${clinicData.emergencyLine.replace(/\D/g, '')}`}
                className="text-base font-black text-rose-300 hover:text-white transition-colors font-display"
              >
                {clinicData.emergencyLine}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-body">
            © {new Date().getFullYear()} Bright Smile Dental. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="text-xs text-slate-600 hover:text-slate-300 transition-colors font-body">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-slate-600 hover:text-slate-300 transition-colors font-body">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="text-xs text-slate-700 hover:text-slate-500 transition-colors font-body">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

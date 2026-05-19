import Link from 'next/link'
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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Emergency banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-medium">
          <span>Dental Emergency? We have same-day appointments.</span>
          <a
            href={`tel:${clinicData.emergencyLine.replace(/\D/g, '')}`}
            className="font-bold underline underline-offset-2 hover:text-red-100"
          >
            Call {clinicData.emergencyLine} Now
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  Bright Smile
                </span>
                <span className="text-[10px] font-medium text-sky-400 uppercase tracking-widest">
                  Dental
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Modern dentistry for Austin families. Trusted care, advanced technology, and a team that genuinely cares about your smile.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={clinicData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href={clinicData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">{clinicData.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <a href={`tel:${clinicData.phone.replace(/\D/g, '')}`} className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                  {clinicData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${clinicData.email}`} className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                  {clinicData.email}
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-1.5">Accepted Insurance</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Delta Dental · Aetna · Cigna · MetLife · Humana · Guardian · United Healthcare · Blue Cross
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              <Clock className="inline h-3.5 w-3.5 mr-1.5" />
              Office Hours
            </h3>
            <ul className="space-y-2">
              {officeHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.day}</span>
                  <span className={item.hours === 'Closed' ? 'text-gray-600' : 'text-gray-300'}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-800/40">
              <p className="text-xs text-red-400 font-medium mb-0.5">24/7 Emergency Line</p>
              <a
                href={`tel:${clinicData.emergencyLine.replace(/\D/g, '')}`}
                className="text-sm font-bold text-red-300 hover:text-white transition-colors"
              >
                {clinicData.emergencyLine}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bright Smile Dental. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-white/60'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0369A1] to-[#38BDF8] shadow-md shadow-sky-300/40 group-hover:shadow-sky-400/60 transition-shadow duration-300" />
            <div className="absolute inset-0 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold font-display">B</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-semibold text-[#0C1A2E] tracking-tight font-display">
              Bright Smile
            </span>
            <span className="text-[10px] font-semibold text-[#0369A1] uppercase tracking-[0.2em]">
              Dental
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 hover:text-[#0369A1] transition-colors duration-200 py-1 group"
            >
              {link.label}
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-0.5 bg-[#0369A1] rounded-full transition-all duration-300',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
        </div>

        {/* CTA area */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:5125550142"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0369A1] transition-colors duration-200"
          >
            <Phone className="h-3.5 w-3.5" />
            (512) 555-0142
          </a>
          <Button
            asChild
            className="relative bg-[#0369A1] hover:bg-[#025585] text-white rounded-full px-6 font-medium shadow-md shadow-sky-300/40 hover:shadow-sky-400/50 transition-all duration-300 overflow-hidden group"
            size="sm"
          >
            <Link href="/book">
              <span className="relative z-10">Book Online</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#0369A1] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#0369A1] hover:bg-sky-50 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200',
                      pathname === link.href
                        ? 'bg-sky-50 text-[#0369A1] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.06 }}
                className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2"
              >
                <a
                  href="tel:5125550142"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600"
                >
                  <Phone className="h-4 w-4 text-[#0369A1]" />
                  (512) 555-0142
                </a>
                <Button
                  asChild
                  className="w-full bg-[#0369A1] hover:bg-[#025585] text-white rounded-full font-medium shadow-md shadow-sky-300/30"
                >
                  <Link href="/book">Book an Appointment</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

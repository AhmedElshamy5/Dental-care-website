'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shadow-sm group-hover:bg-sky-600 transition-colors">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-lg font-semibold text-gray-900 tracking-tight"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Bright Smile
            </span>
            <span className="text-[10px] font-medium text-sky-500 uppercase tracking-widest">
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
              className={cn(
                'text-sm font-medium transition-colors hover:text-sky-600',
                pathname === link.href ? 'text-sky-600' : 'text-gray-600'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA area */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:5125550142"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            (512) 555-0142
          </a>
          <Button
            asChild
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 font-medium shadow-sm"
            size="sm"
          >
            <Link href="/book">Book Online</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:5125550142"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600"
              >
                <Phone className="h-4 w-4 text-sky-500" />
                (512) 555-0142
              </a>
              <Button
                asChild
                className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full font-medium"
              >
                <Link href="/book">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

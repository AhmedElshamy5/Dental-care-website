'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Star, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (chatOpen) {
      window.dispatchEvent(new CustomEvent('open-chat'))
    }
  }, [chatOpen])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-lime-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-100/40 rounded-full blur-3xl -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm mb-6">
              <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse" />
              Now accepting new patients · Austin, TX
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Modern Dentistry
              <br />
              <span className="text-sky-500">for Austin</span>
              <br />
              Families
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Same-day appointments, friendly staff, and the latest technology — all in one welcoming space on South Lamar.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8 font-medium shadow-md shadow-sky-200 hover:shadow-sky-300 transition-all"
              >
                <Link href="/book">
                  Book Online
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setChatOpen(true)}
                className="rounded-full px-8 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-sky-300 transition-all"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-sky-500" />
                Chat With Us
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.9</span>
                <span className="text-sm text-gray-500">on Google</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-sky-500" />
                <span className="text-sm text-gray-600">800+ happy patients</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-sky-500" />
                <span className="text-sm text-gray-600">Same-day emergency care</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Image stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/50 aspect-[4/5] max-w-sm ml-auto">
              <Image
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=1000&fit=crop"
                alt="Modern dental office at Bright Smile Dental Austin"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent" />
            </div>

            {/* Floating card: Next availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] border border-gray-100"
            >
              <p className="text-xs text-gray-500 font-medium mb-1">Next available</p>
              <p className="text-sm font-bold text-gray-900">Today · 2:30 PM</p>
              <p className="text-xs text-sky-600 mt-1">General Cleaning</p>
              <Link href="/book">
                <Button size="sm" className="mt-2 w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs h-7">
                  Book Now
                </Button>
              </Link>
            </motion.div>

            {/* Floating card: Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -right-4 bottom-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">4.9</span>
              </div>
              <p className="text-xs text-gray-500">800+ Google reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

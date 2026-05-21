'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, Star, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const headline = ['Modern', 'Dentistry', 'for Austin', 'Families']

export default function HeroSection() {
  const [chatOpen, setChatOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  useEffect(() => {
    if (chatOpen) window.dispatchEvent(new CustomEvent('open-chat'))
  }, [chatOpen])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #FAFBFC 50%, #FFF7ED 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute top-[-100px] right-[-80px] w-[700px] h-[700px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #BAE6FD 0%, #E0F2FE 50%, transparent 70%)' }}
        />
        <div
          className="orb-2 absolute bottom-[-120px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FED7AA 0%, #FFF7ED 50%, transparent 70%)' }}
        />
        <div
          className="orb-3 absolute top-[40%] left-[35%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #BAE6FD 0%, transparent 70%)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#0369A1 1px, transparent 1px), linear-gradient(90deg, #0369A1 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Location line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-sm font-semibold text-[#0369A1] tracking-wide mb-7 font-body"
            >
              Now accepting new patients · Austin, TX
            </motion.p>

            {/* Headline — word stagger */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#0C1A2E] mb-6">
              {headline.map((word, wi) => (
                <motion.span
                  key={wi}
                  className="block"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {wi === 2 ? (
                    <span className="animated-gradient-text">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
              className="text-lg text-slate-500 leading-relaxed mb-9 max-w-lg font-body"
            >
              Same-day appointments, friendly staff, and the latest technology — all in one welcoming space on South Lamar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="relative bg-[#0369A1] hover:bg-[#025585] text-white rounded-full px-8 font-semibold shadow-lg shadow-sky-300/40 hover:shadow-sky-400/50 transition-all duration-300 overflow-hidden group h-12"
              >
                <Link href="/book">
                  <span className="relative z-10 flex items-center gap-2">
                    Book Online
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#025585] via-[#0369A1] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setChatOpen(true)}
                className="rounded-full px-8 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-[#0369A1] hover:text-[#0369A1] transition-all duration-300 h-12 font-medium"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat With Us
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#0C1A2E]">4.9</span>
                <span className="text-sm text-slate-500">on Google</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#0369A1]" />
                <span className="text-sm text-slate-600">800+ happy patients</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0369A1]" />
                <span className="text-sm text-slate-600">Same-day emergency care</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Image + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <motion.div
              style={{ y: imgY }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-sky-200/60 aspect-[4/5] max-w-sm ml-auto border border-white/60"
            >
              <Image
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=1000&fit=crop"
                alt="Modern dental office at Bright Smile Dental Austin"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E]/25 via-transparent to-transparent" />
            </motion.div>

            {/* Floating card: Next availability */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: 'float-y 4s ease-in-out infinite' }}
              className="absolute -left-10 top-14 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 p-4 w-52 border border-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#0369A1] flex items-center justify-center">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Next Available</p>
              </div>
              <p className="text-sm font-bold text-[#0C1A2E]">Today · 2:30 PM</p>
              <p className="text-xs text-[#0369A1] font-medium mt-0.5">General Cleaning</p>
              <Link href="/book">
                <Button
                  size="sm"
                  className="mt-3 w-full bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl text-xs h-7 font-medium"
                >
                  Book Now
                </Button>
              </Link>
            </motion.div>

            {/* Floating card: Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: 'float-y 5s ease-in-out infinite 1s' }}
              className="absolute -right-6 bottom-24 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 p-4 border border-white"
            >
              <div className="flex gap-0.5 mb-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base font-bold text-[#0C1A2E]">4.9 / 5.0</p>
              <p className="text-xs text-slate-500 mt-0.5">800+ Google reviews</p>
            </motion.div>

            {/* Floating card: Patients */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: 'float-y 6s ease-in-out infinite 0.5s' }}
              className="absolute -left-6 bottom-40 bg-gradient-to-br from-[#0369A1] to-[#38BDF8] rounded-2xl shadow-xl shadow-sky-300/40 p-4 border border-white/20"
            >
              <p className="text-2xl font-bold text-white font-display">800+</p>
              <p className="text-xs text-sky-100 font-medium mt-0.5">Happy patients</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-slate-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

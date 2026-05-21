'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/clinic-data'

const AUTO_ADVANCE_MS = 5000

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir)
    setCurrent(next)
    setProgress(0)
  }, [])

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length, -1)
  const next = useCallback(() => go((current + 1) % testimonials.length, 1), [current, go])

  // Auto-advance with progress
  useEffect(() => {
    if (paused) return
    const interval = 50
    const steps = AUTO_ADVANCE_MS / interval
    let step = 0
    const timer = setInterval(() => {
      step++
      setProgress((step / steps) * 100)
      if (step >= steps) {
        next()
        step = 0
      }
    }, interval)
    return () => clearInterval(timer)
  }, [paused, next])

  const t = testimonials[current]

  return (
    <section
      className="py-20 lg:py-28 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0C1A2E 0%, #0369A1 60%, #38BDF8 100%)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold text-sky-300 uppercase tracking-[0.2em] mb-4">
            Patient Stories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            Real Smiles,
            <br />
            <em className="not-italic text-sky-300">Real Results</em>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl shadow-black/20">
            {/* Decorative quote */}
            <div className="absolute top-6 left-8 opacity-20">
              <Quote className="h-14 w-14 text-white" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: direction * -80, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.3, type: 'spring' }}
                    >
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl sm:text-2xl text-white font-normal leading-relaxed mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/40 ring-offset-2 ring-offset-transparent flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm font-body">{t.name}</p>
                    <p className="text-sky-300 text-xs font-body mt-0.5">{t.service} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 rounded-b-3xl overflow-hidden">
              {!paused && (
                <motion.div
                  className="h-full bg-sky-300"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0 }}
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

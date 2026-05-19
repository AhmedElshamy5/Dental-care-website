import type { Metadata } from 'next'
import HeroSection from '@/components/homepage/HeroSection'
import ServicesGrid from '@/components/homepage/ServicesGrid'
import DentistsSection from '@/components/homepage/DentistsSection'
import WhyChooseUs from '@/components/homepage/WhyChooseUs'
import TestimonialsSection from '@/components/homepage/TestimonialsSection'
import CTASection from '@/components/homepage/CTASection'

export const metadata: Metadata = {
  title: 'Bright Smile Dental | Modern Family & Cosmetic Dentistry in Austin, TX',
  description:
    'Austin\'s friendliest dental practice. General, cosmetic, pediatric dentistry, Invisalign, implants & same-day emergency care. Dr. Sarah Chen & Dr. James Walker. Book online.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <DentistsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

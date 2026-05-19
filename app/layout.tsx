import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bright Smile Dental | Modern Family & Cosmetic Dentistry in Austin, TX',
  description: 'Modern family and cosmetic dentistry in Austin, TX. Same-day appointments, Invisalign, dental implants, teeth whitening, and more. Dr. Sarah Chen & Dr. James Walker.',
  keywords: ['dentist Austin TX', 'family dentistry', 'cosmetic dentistry', 'Invisalign Austin', 'dental implants Austin', 'teeth whitening Austin'],
  openGraph: {
    title: 'Bright Smile Dental | Austin, TX',
    description: 'Modern dentistry for Austin families. Same-day appointments available.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}

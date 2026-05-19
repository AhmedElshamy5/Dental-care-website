import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Bright Smile Dental',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

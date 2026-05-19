import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ChatWidget from '@/components/chatbot/ChatWidget'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  )
}

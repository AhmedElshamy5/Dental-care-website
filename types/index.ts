export interface Service {
  slug: string
  name: string
  category: 'family' | 'cosmetic' | 'specialty'
  icon: string
  shortDescription: string
  description: string[]
  startingPrice: string
  priceBreakdown: { label: string; price: string }[]
  whatToExpect: string[]
  faqs: { question: string; answer: string }[]
}

export interface Dentist {
  id: string
  name: string
  title: string
  specialty: string
  bio: string
  education: string[]
  credentials: string[]
  image: string
  yearsExperience: number
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
  service: string
  image: string
  date: string
}

export interface Appointment {
  id?: string
  patient_name: string
  email: string
  phone: string
  service: string
  preferred_date: string
  preferred_time: string
  insurance_provider?: string
  is_new_patient: boolean
  notes?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at?: string
}

export interface ChatbotInquiry {
  id?: string
  name?: string
  phone?: string
  email?: string
  inquiry_type?: string
  conversation: { role: string; content: string }[]
  contacted?: boolean
  created_at?: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

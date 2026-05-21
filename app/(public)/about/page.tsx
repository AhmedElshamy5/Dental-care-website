import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Award, Heart, ArrowUpRight } from 'lucide-react'
import { dentists, clinicData } from '@/lib/clinic-data'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us | Bright Smile Dental — Austin, TX',
  description: 'Meet Dr. Sarah Chen and Dr. James Walker. Learn about our mission, our team, and why Austin families choose Bright Smile Dental.',
}

const officeImages = [
  { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', alt: 'Modern dental operatory at Bright Smile Dental' },
  { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop', alt: 'Welcoming reception at Bright Smile Dental' },
  { src: 'https://images.unsplash.com/photo-1644953978780-e12543b4cb85?w=600&h=400&fit=crop', alt: 'Dental technology at Bright Smile Dental' },
  { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop', alt: 'Dr. Chen with patient' },
]

const stats = [
  { value: '15+', label: 'Years of combined experience' },
  { value: '800+', label: 'Patients served' },
  { value: '98%', label: 'Would recommend us' },
  { value: '4.9★', label: 'Average Google rating' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #FAFBFC 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 font-body">About Us</p>
            <h1 className="font-display text-5xl sm:text-6xl text-[#0C1A2E] font-normal mb-5 leading-tight">
              A Dental Practice
              <br />
              <em className="not-italic text-[#0369A1]">Built on Trust</em>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed font-body">
              Bright Smile Dental was founded in 2012 with a single mission: deliver the best dental care in Austin with the warmth and personal attention you&apos;d expect from a neighborhood practice. Twelve years later, that mission drives every appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Practice story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-5">
              <h2 className="font-display text-4xl sm:text-5xl text-[#0C1A2E] font-normal">
                Our Story
              </h2>
              <p className="text-slate-600 leading-relaxed font-body">
                When Dr. Sarah Chen graduated from UT Austin&apos;s dental school, she noticed a gap in Austin&apos;s dental market: practices that were either purely transactional — treat them and move on — or so premium-focused they felt cold and uninviting. She believed great dental care could be both clinically excellent and genuinely warm.
              </p>
              <p className="text-slate-600 leading-relaxed font-body">
                She opened Bright Smile Dental on South Lamar with four treatment rooms, one front desk staff member, and a commitment to remembering every patient&apos;s name. Three years later, Dr. James Walker joined as a pediatric specialist, and the practice grew to serve entire families across Austin.
              </p>
              <p className="text-slate-600 leading-relaxed font-body">
                Today, we see patients from toddlers to grandparents, offering everything from a child&apos;s first cleaning to full smile transformations. We&apos;ve invested in the best technology — digital X-rays, 3D cone beam CT, iTero scanners, laser dentistry — because our patients deserve it.
              </p>
              <div className="flex items-start gap-3 pt-2">
                <Heart className="h-5 w-5 text-[#0369A1] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 italic font-body">
                  &ldquo;We treat every patient the way we&apos;d want our own family treated.&rdquo; — Dr. Sarah Chen
                </p>
              </div>
            </div>

            {/* Office gallery */}
            <div className="grid grid-cols-2 gap-3">
              {officeImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden ${
                    i === 0 || i === 3 ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #0C1A2E 0%, #0369A1 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-white font-normal mb-2">{stat.value}</p>
                <p className="text-sky-200 text-sm font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dentist Bios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-4 font-body">The Team</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0C1A2E] font-normal">
              Your Dentists
            </h2>
          </div>

          <div className="space-y-20">
            {dentists.map((dentist, i) => (
              <div
                key={dentist.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                {/* Photo */}
                <div className="lg:[direction:ltr]">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto shadow-xl shadow-slate-200/60">
                    <Image
                      src={dentist.image}
                      alt={`${dentist.name}, ${dentist.title}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0C1A2E]/70 to-transparent p-6">
                      <p className="font-display text-white text-xl">{dentist.name}</p>
                      <p className="text-sky-200 text-sm font-body mt-0.5">{dentist.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:[direction:ltr]">
                  <p className="text-sm font-bold text-[#0369A1] font-body mb-1">
                    {dentist.yearsExperience}+ years experience
                  </p>
                  <h3 className="font-display text-4xl text-[#0C1A2E] font-normal mb-2">
                    {dentist.name}
                  </h3>
                  <p className="text-[#0369A1] font-semibold mb-5 font-body">{dentist.specialty}</p>
                  <p className="text-slate-600 leading-relaxed mb-7 font-body">{dentist.bio}</p>

                  {/* Education */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 font-body flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" /> Education
                    </p>
                    <ul className="space-y-2">
                      {dentist.education.map((edu) => (
                        <li key={edu} className="text-sm text-slate-600 flex items-start gap-2 font-body">
                          <span className="w-1 h-1 bg-[#0369A1] rounded-sm mt-2 flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Credentials */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 font-body flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" /> Credentials & Memberships
                    </p>
                    <ul className="space-y-2">
                      {dentist.credentials.map((cred) => (
                        <li key={cred} className="text-sm text-slate-600 flex items-start gap-2 font-body">
                          <span className="w-1 h-1 bg-[#B45309] rounded-sm mt-2 flex-shrink-0" />
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-9 w-9 text-[#0369A1] mx-auto mb-6" />
          <h2 className="font-display text-4xl text-[#0C1A2E] font-normal mb-5">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 font-body">
            To be the dental practice Austin families trust with their most important asset: their health. We are committed to clinical excellence, genuine compassion, transparent pricing, and making every patient — regardless of age or background — feel at home.
          </p>
          <Button
            asChild
            className="bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl px-8 font-semibold shadow-md shadow-sky-200/40 font-body"
          >
            <Link href="/book">
              Book an Appointment <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

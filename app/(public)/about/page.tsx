import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Award, Heart, Users, ArrowRight } from 'lucide-react'
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
      <section className="pt-28 pb-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-3">About Us</p>
            <h1
              className="text-4xl sm:text-5xl text-gray-900 font-normal mb-5"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              A Dental Practice
              <br />
              Built on Trust
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
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
              <h2
                className="text-3xl sm:text-4xl text-gray-900 font-normal"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed">
                When Dr. Sarah Chen graduated from UT Austin&apos;s dental school, she noticed a gap in Austin&apos;s dental market: practices that were either purely transactional — treat them and move on — or so premium-focused they felt cold and uninviting. She believed great dental care could be both clinically excellent and genuinely warm.
              </p>
              <p className="text-gray-600 leading-relaxed">
                She opened Bright Smile Dental on South Lamar with four treatment rooms, one front desk staff member, and a commitment to remembering every patient&apos;s name. Three years later, Dr. James Walker joined as a pediatric specialist, and the practice grew to serve entire families across Austin.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we see patients from toddlers to grandparents, offering everything from a child&apos;s first cleaning to full smile transformations. We&apos;ve invested in the best technology — digital X-rays, 3D cone beam CT, iTero scanners, laser dentistry — because our patients deserve it. And we&apos;ve maintained the same waiting room that feels less like a clinic and more like a living room.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Heart className="h-5 w-5 text-sky-500 flex-shrink-0" />
                <p className="text-sm text-gray-500 italic">
                  &ldquo;We treat every patient the way we&apos;d want our own family treated.&rdquo; — Dr. Sarah Chen
                </p>
              </div>
            </div>

            {/* Office gallery */}
            <div className="grid grid-cols-2 gap-3">
              {officeImages.map((img, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'aspect-square' : i === 1 ? 'aspect-[4/3]' : 'aspect-[4/3]'} ${i === 3 ? 'aspect-square' : ''}`}>
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
      <section className="py-14 bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-4xl text-white font-normal mb-2"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sky-100 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dentist Bios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-3">The Team</p>
            <h2
              className="text-3xl sm:text-4xl text-gray-900 font-normal"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Your Dentists
            </h2>
          </div>

          <div className="space-y-16">
            {dentists.map((dentist, i) => (
              <div
                key={dentist.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                {/* Photo */}
                <div className="lg:[direction:ltr]">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto shadow-xl">
                    <Image
                      src={dentist.image}
                      alt={`${dentist.name}, ${dentist.title}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                        {dentist.name}
                      </p>
                      <p className="text-sky-200 text-sm">{dentist.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:[direction:ltr]">
                  <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <Users className="h-3.5 w-3.5" />
                    {dentist.yearsExperience}+ years experience
                  </div>
                  <h3
                    className="text-3xl text-gray-900 font-normal mb-2"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {dentist.name}
                  </h3>
                  <p className="text-sky-600 font-medium mb-4">{dentist.specialty}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{dentist.bio}</p>

                  {/* Education */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" /> Education
                    </p>
                    <ul className="space-y-1.5">
                      {dentist.education.map((edu) => (
                        <li key={edu} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Credentials */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" /> Credentials & Memberships
                    </p>
                    <ul className="space-y-1.5">
                      {dentist.credentials.map((cred) => (
                        <li key={cred} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1 h-1 bg-lime-500 rounded-full mt-2 flex-shrink-0" />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-10 w-10 text-sky-500 mx-auto mb-6" />
          <h2
            className="text-3xl text-gray-900 font-normal mb-4"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To be the dental practice Austin families trust with their most important asset: their health. We are committed to clinical excellence, genuine compassion, transparent pricing, and making every patient — regardless of age or background — feel at home.
          </p>
          <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8 font-medium">
            <Link href="/book">
              Book an Appointment <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

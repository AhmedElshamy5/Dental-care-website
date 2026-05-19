import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, CheckCircle, DollarSign, HelpCircle, ArrowRight } from 'lucide-react'
import { services } from '@/lib/clinic-data'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.name} in Austin TX | Bright Smile Dental`,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest mb-2 capitalize">
                {service.category}
              </p>
              <h1
                className="text-4xl sm:text-5xl text-gray-900 font-normal"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {service.name}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Starting at</p>
                <p
                  className="text-3xl text-sky-600"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {service.startingPrice}
                </p>
              </div>
              <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6">
                <Link href={`/book?service=${encodeURIComponent(service.name)}`}>
                  Book Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Description */}
        <section className="space-y-4">
          {service.description.map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed text-lg">{para}</p>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          {/* What to expect */}
          <section>
            <h2
              className="text-2xl text-gray-900 font-normal mb-5"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              What to Expect
            </h2>
            <ol className="space-y-4">
              {service.whatToExpect.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Pricing */}
          <section>
            <h2
              className="text-2xl text-gray-900 font-normal mb-5"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              <DollarSign className="inline h-6 w-6 text-sky-500 mb-1" /> Pricing
            </h2>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
              {service.priceBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between items-center gap-2 py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Most insurance plans accepted. We&apos;ll verify your benefits before treatment. CareCredit financing available.
            </p>
          </section>
        </div>

        {/* FAQs */}
        <section>
          <h2
            className="text-2xl text-gray-900 font-normal mb-6"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            <HelpCircle className="inline h-6 w-6 text-sky-500 mb-1 mr-1" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-sky-50 to-lime-50/30 rounded-3xl p-10 text-center border border-sky-100">
          <h2
            className="text-2xl sm:text-3xl text-gray-900 font-normal mb-3"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Ready to book your {service.name} appointment?
          </h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            New patients always welcome. Same-day appointments available. We&apos;ll verify your insurance before your visit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8 font-medium">
              <Link href={`/book?service=${encodeURIComponent(service.name)}`}>
                Book This Service <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

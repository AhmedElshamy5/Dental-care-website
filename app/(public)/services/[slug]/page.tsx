import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, CheckCircle, DollarSign, HelpCircle, ArrowRight, ArrowUpRight } from 'lucide-react'
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
      <section className="pt-28 pb-14" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #FAFBFC 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0369A1] mb-6 transition-colors font-body"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#0369A1] uppercase tracking-[0.2em] mb-3 font-body capitalize">
                {service.category}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl text-[#0C1A2E] font-normal leading-tight">
                {service.name}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-500 font-body">Starting at</p>
                <p className="font-display text-3xl text-[#0369A1]">{service.startingPrice}</p>
              </div>
              <Button
                asChild
                className="bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl px-6 font-semibold shadow-md shadow-sky-200/40 font-body"
              >
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
            <p key={i} className="text-slate-600 leading-relaxed text-lg font-body">{para}</p>
          ))}
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          {/* What to expect */}
          <section>
            <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-6">
              What to Expect
            </h2>
            <ol className="space-y-5">
              {service.whatToExpect.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-7 h-7 rounded-lg bg-[#0369A1] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-body">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pt-0.5 font-body">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-6 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-[#0369A1]" /> Pricing
            </h2>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
              {service.priceBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-600 font-body">{item.label}</span>
                  <span className="text-sm font-bold text-[#0C1A2E] flex-shrink-0 font-body">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3 font-body">
              Most insurance plans accepted. We&apos;ll verify your benefits before treatment. CareCredit financing available.
            </p>
          </section>
        </div>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-3xl text-[#0C1A2E] font-normal mb-7 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-[#0369A1]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-slate-100 rounded-2xl p-6">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0369A1] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0C1A2E] mb-2 font-body">{faq.question}</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-3xl p-10 text-center border border-slate-100 bg-slate-50">
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1A2E] font-normal mb-3">
            Ready to book your {service.name} appointment?
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto font-body">
            New patients always welcome. Same-day appointments available. We&apos;ll verify your insurance before your visit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-[#0369A1] hover:bg-[#025585] text-white rounded-xl px-8 font-semibold shadow-md shadow-sky-200/40 font-body"
            >
              <Link href={`/book?service=${encodeURIComponent(service.name)}`}>
                Book This Service <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl px-8 font-body border-slate-200">
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

# Bright Smile Dental — Demo Website

A production-quality dental clinic website built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and an AI chatbot powered by the Anthropic Claude API.

## Live Demo Features

- **Public website** with Homepage, Services (8 service detail pages), About, Contact, and Booking
- **AI chatbot (Brighty)** — powered by Claude Haiku, answers questions about hours, pricing, insurance, services, and books appointments
- **Multi-step booking form** with calendar picker and real-time validation
- **Admin dashboard** at `/admin` — appointments, inquiries, status management
- **Bilingual** — chatbot supports English and Spanish
- **Mobile-first**, responsive, accessible

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** for animations
- **Anthropic Claude API** (`claude-haiku-4-5-20251001`) for the chatbot
- **Supabase** for appointments and chatbot inquiry storage
- **React Hook Form + Zod** for form validation
- **react-day-picker v10** for the booking calendar

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd bright-smile-dental
npm install
```

### 2. Set environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase project → Settings → API |

### 3. Set up Supabase (optional for full functionality)

Run the following SQL in your Supabase SQL editor:

```sql
create table appointments (
  id uuid default gen_random_uuid() primary key,
  patient_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  preferred_date date not null,
  preferred_time time not null,
  insurance_provider text,
  is_new_patient boolean default false,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

create table chatbot_inquiries (
  id uuid default gen_random_uuid() primary key,
  name text,
  phone text,
  email text,
  inquiry_type text,
  conversation jsonb,
  contacted boolean default false,
  created_at timestamptz default now()
);
```

> **Note:** The site works in demo mode without Supabase — bookings return mock confirmation numbers and the admin uses sample data.

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Admin portal:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
Demo credentials: `admin@brightsmiledental.com` / `demo1234`

### 5. Deploy to Vercel

```bash
vercel deploy
```

Add all environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Customizing for Another Dental Client

All clinic-specific data is in **one file**: `lib/clinic-data.ts`

Update these fields:
- `clinicData` — name, address, phone, hours, insurance list
- `services` — 8 service objects (name, slug, description, pricing, FAQs)
- `dentists` — doctor bios, credentials, images
- `testimonials` — patient reviews

Also update:
- `lib/chatbot-prompt.ts` — replace all clinic info in the system prompt
- `app/layout.tsx` — update metadata title and description
- Brand colors in `app/globals.css` (change `--brand-blue`, `--brand-green`)

## Project Structure

```
bright-smile-dental/
├── app/
│   ├── (public)/           # Public-facing pages
│   ├── (admin)/            # Admin dashboard
│   └── api/                # Chat, appointments, inquiries API routes
├── components/
│   ├── chatbot/            # ChatWidget, ChatMessage
│   ├── homepage/           # Hero, Services, Dentists, Testimonials, CTA
│   ├── shared/             # Navbar, Footer
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── clinic-data.ts      # ALL clinic data lives here
│   ├── chatbot-prompt.ts   # AI chatbot system prompt
│   └── supabase.ts
└── types/index.ts
```

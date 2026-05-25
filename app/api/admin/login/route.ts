import { NextRequest, NextResponse } from 'next/server'
import { signSession, verifyAdminCredentials, COOKIE_NAME, SESSION_TTL_SEC } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, 'admin-login', { limit: 5, windowMs: 15 * 60 * 1000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { email, password } = (body ?? {}) as { email?: unknown; password?: unknown }
  if (typeof email !== 'string' || typeof password !== 'string'
      || email.length > 254 || password.length > 200
      || email.length === 0 || password.length === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const sub = verifyAdminCredentials(email, password)
  if (!sub) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signSession(sub)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure:   process.env.NODE_ENV === 'production',
    maxAge:   SESSION_TTL_SEC,
    path:     '/',
  })
  return res
}

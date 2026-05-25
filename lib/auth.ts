import { cookies } from 'next/headers'

const COOKIE_NAME = 'bsd_admin'
const SESSION_TTL_SEC = 60 * 60 * 8

const DEMO_EMAIL = 'admin@brightsmiledental.com'
const DEMO_PASSWORD = 'demo1234'

function getSecretKeyMaterial(): ArrayBuffer {
  const secret = process.env.ADMIN_SECRET
    ?? (process.env.NODE_ENV !== 'production' ? 'dev-only-secret-do-not-use-in-prod-xxxxxxxx' : undefined)
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SECRET env var (32+ chars) is required in production.')
  }
  const bytes = new TextEncoder().encode(secret)
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

function b64urlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let bin = ''
  for (const b of view) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)
  const bin = atob(padded)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    getSecretKeyMaterial(),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const data = new TextEncoder().encode(payload)
  const buf  = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
  const sig  = await crypto.subtle.sign('HMAC', key, buf)
  return b64urlEncode(sig)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export type Session = { sub: string; exp: number }

export async function signSession(sub: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC
  const payload = b64urlEncode(new TextEncoder().encode(JSON.stringify({ sub, exp })))
  const sig = await hmac(payload)
  return `${payload}.${sig}`
}

export async function verifySession(token: string): Promise<Session | null> {
  const dot = token.indexOf('.')
  if (dot < 0) return null
  const payload = token.slice(0, dot)
  const sig     = token.slice(dot + 1)
  const expected = await hmac(payload)
  if (!timingSafeEqual(sig, expected)) return null
  try {
    const json = new TextDecoder().decode(b64urlDecode(payload))
    const obj = JSON.parse(json) as Session
    if (typeof obj.sub !== 'string' || typeof obj.exp !== 'number') return null
    if (obj.exp * 1000 < Date.now()) return null
    return obj
  } catch {
    return null
  }
}

export function verifyAdminCredentials(email: string, password: string): string | null {
  const envEmail = process.env.ADMIN_EMAIL
  const envPass  = process.env.ADMIN_PASSWORD

  if (envEmail && envPass && envPass.length >= 8) {
    if (timingSafeEqual(email.toLowerCase(), envEmail.toLowerCase())
      && timingSafeEqual(password, envPass)) {
      return envEmail
    }
    return null
  }

  // Demo mode: only allow demo creds when no real password is configured AND not in prod.
  if (process.env.NODE_ENV !== 'production'
    && timingSafeEqual(email.toLowerCase(), DEMO_EMAIL)
    && timingSafeEqual(password, DEMO_PASSWORD)) {
    return DEMO_EMAIL
  }
  return null
}

export async function getAdminSession(): Promise<Session | null> {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export { COOKIE_NAME, SESSION_TTL_SEC }

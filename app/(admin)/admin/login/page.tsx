'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password required'),
})

type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      if (res.ok) {
        router.replace('/admin')
        router.refresh()
        return
      }
      if (res.status === 429) {
        setError('Too many attempts. Please try again later.')
      } else {
        setError('Invalid credentials.')
      }
    } catch {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-white text-lg font-bold">B</span>
          </div>
          <h1
            className="text-2xl text-gray-900 font-normal"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            Admin Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">Bright Smile Dental</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                <Mail className="inline h-3.5 w-3.5 mr-1 text-gray-400" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1.5 rounded-xl ${errors.email ? 'border-red-300' : ''}`}
                placeholder="admin@brightsmiledental.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                <Lock className="inline h-3.5 w-3.5 mr-1 text-gray-400" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={`mt-1.5 rounded-xl ${errors.password ? 'border-red-300' : ''}`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium h-11"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Sign In
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

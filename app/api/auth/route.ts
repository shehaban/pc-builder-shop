import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, generateToken, createUser, getUsers, updateUser, deleteUser } from '@/lib/auth/user-service'
import { UserRole, canManageUsers } from '@/lib/auth/types'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case 'login': {
        const { email, password } = data
        const user = await authenticateUser(email, password)

        console.log('Login attempt - email:', email, 'user found:', !!user)
        if (user) {
          console.log('Login user:', { id: user.id, email: user.email, role: user.role })
        }

        if (!user) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = generateToken(user)
        console.log('Generated token length:', token.length)

        // Return token in response for localStorage storage
        const response = NextResponse.json({
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          token: token
        })

        console.log('Login successful, token returned')
        return response
      }

      case 'register': {
        const { email, name, password } = data
        const user = await createUser({ email, name, password })
        const token = generateToken(user)

        const response = NextResponse.json({ user })
        response.cookies.set('auth-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7
        })

        return response
      }

      case 'logout': {
        const response = NextResponse.json({ success: true })
        response.cookies.set('auth-token', '', { maxAge: 0 })
        return response
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const { verifyToken } = await import('@/lib/auth/user-service')
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}
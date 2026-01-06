import { NextRequest, NextResponse } from 'next/server'
import { getUserById } from '@/lib/auth/user-service'
import { canAccessAdmin, getUserRole } from '@/lib/auth/types'

export async function GET(request: NextRequest) {
  try {
    // Get user from localStorage (this will be passed from client)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    console.log('Admin verify - userId:', userId)

    if (!userId) {
      return NextResponse.json({ isAdmin: false, error: 'No user ID provided' })
    }

    const user = await getUserById(userId)
    console.log('Admin verify - user found:', !!user)
    if (user) {
      console.log('Admin verify - user role from DB:', user.role, 'is_admin:', user.is_admin)
    }

    if (!user) {
      return NextResponse.json({ isAdmin: false, error: 'User not found' })
    }

    const userRole = getUserRole(user)
    const isAdmin = canAccessAdmin(userRole)

    console.log('Admin verify - computed role:', userRole, 'isAdmin:', isAdmin)

    return NextResponse.json({
      isAdmin,
      role: userRole,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: userRole
      }
    })
  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json({ isAdmin: false, error: 'Verification failed' })
  }
}
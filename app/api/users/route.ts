import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '@/lib/auth/user-service'
import { UserRole, canManageUsers } from '@/lib/auth/types'
import { verifyToken } from '@/lib/auth/user-service'

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin permissions
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const authenticatedUser = verifyToken(token)
    if (!authenticatedUser || !canManageUsers(authenticatedUser.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const user = verifyToken(token)
    if (!user || !canManageUsers(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const users = await getUsers()
    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)

    return NextResponse.json({ users: usersWithoutPasswords })
  } catch (error: any) {
    console.error('Users fetch error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin permissions
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    console.log('Users API - Auth header present:', !!authHeader, 'Token present:', !!token)

    if (!token) {
      console.log('Users API - No token found, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const authenticatedUser = verifyToken(token)
    console.log('Users API - Verified user:', authenticatedUser)

    if (!authenticatedUser) {
      console.log('Users API - Token verification failed, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Users API - User role:', authenticatedUser.role, 'canManageUsers result:', canManageUsers(authenticatedUser.role))

    if (!canManageUsers(authenticatedUser.role)) {
      console.log('Users API - Insufficient permissions, returning 403')
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const { action, ...data } = await request.json()

    switch (action) {
      case 'create': {
        const { email, name, password, role } = data
        const newUser = await createUser({ email, name, password, role })
        return NextResponse.json({ user: newUser })
      }

      case 'update': {
        const { id, ...updates } = data
        const updatedUser = await updateUser(id, updates)
        if (!updatedUser) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json({ user: updatedUser })
      }

      case 'delete': {
        const { id } = data
        const success = await deleteUser(id)
        if (!success) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json({ success: true })
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Users management error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
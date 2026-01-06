import { User, UserRole, AuthUser, getUserRole } from './types'

import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface UserWithPassword extends User {
  password?: string
}

const usersFile = path.join(process.cwd(), 'database', 'users.json')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Initialize users file if it doesn't exist
async function initializeUsersFile() {
  try {
    await fs.access(usersFile)
    // File exists, don't overwrite existing users
  } catch {
    // Create default users only if file doesn't exist
    const passwordHash = await bcrypt.hash('password123', 10)
    const defaultUsers: UserWithPassword[] = [
      {
        id: 'admin-1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        password: passwordHash
      },
      {
        id: 'manager-1',
        email: 'manager@example.com',
        name: 'Manager User',
        role: 'manager',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        password: passwordHash
      },
      {
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        password: passwordHash
      }
    ]

    await fs.writeFile(usersFile, JSON.stringify(defaultUsers, null, 2))
    console.log('Users file initialized with default users')
  }
}

export async function getUsers(): Promise<UserWithPassword[]> {
  await initializeUsersFile()
  try {
    const data = await fs.readFile(usersFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers()
  return users.find(user => user.id === id) || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers()
  return users.find(user => user.email === email) || null
}

export async function createUser(userData: {
  email: string
  name: string
  password: string
  role?: UserRole
}): Promise<User> {
  const users = await getUsers()

  // Check if user already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const newUser: UserWithPassword = {
    id: `user-${Date.now()}`,
    email: userData.email,
    name: userData.name,
    role: userData.role || 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    password: hashedPassword
  }

  users.push(newUser)
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2))

  // Remove password from returned user
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await getUsers()
  const userIndex = users.findIndex(user => user.id === id)

  if (userIndex === -1) {
    return null
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  await fs.writeFile(usersFile, JSON.stringify(users, null, 2))

  // Remove password from returned user
  const user = users[userIndex]
  const { password, ...userWithoutPassword } = user as UserWithPassword
  return userWithoutPassword
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await getUsers()
  const filteredUsers = users.filter(user => user.id !== id)

  if (filteredUsers.length === users.length) {
    return false // User not found
  }

  await fs.writeFile(usersFile, JSON.stringify(filteredUsers, null, 2))
  return true
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const users = await getUsers()
  const user = users.find(u => u.email === email) as UserWithPassword

  if (!user || !user.password) {
    return null
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return null
  }

  // Convert legacy user to new format
  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name || 'User', // Provide default name
    role: getUserRole(user),
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.updated_at || new Date().toISOString(),
  }

  return authUser
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    console.log('Token verification successful, decoded user:', decoded)
    return decoded
  } catch (error) {
    console.log('Token verification failed:', error.message)
    return null
  }
}
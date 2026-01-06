export type UserRole = 'user' | 'manager' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role?: UserRole // Optional for backward compatibility
  is_admin?: boolean // Legacy field
  created_at?: string
  updated_at?: string
}

export interface AuthUser extends User {
  role: UserRole // Required for auth
  // Additional auth-specific fields if needed
}

// Helper function to get role from user data
export function getUserRole(user: User): UserRole {
  if (user.role) {
    return user.role
  }
  // Legacy support for is_admin field
  return user.is_admin ? 'admin' : 'user'
}

// Role permissions
export const ROLE_PERMISSIONS = {
  user: {
    canViewProducts: true,
    canPlaceOrders: true,
    canViewOwnOrders: true,
    canManageProducts: false,
    canManageOrders: false,
    canManageUsers: false,
    canAccessAdmin: false,
  },
  manager: {
    canViewProducts: true,
    canPlaceOrders: true,
    canViewOwnOrders: true,
    canManageProducts: true,
    canManageOrders: true,
    canManageUsers: false,
    canAccessAdmin: true,
  },
  admin: {
    canViewProducts: true,
    canPlaceOrders: true,
    canViewOwnOrders: true,
    canManageProducts: true,
    canManageOrders: true,
    canManageUsers: true,
    canAccessAdmin: true,
  },
} as const

export function hasPermission(userRole: UserRole, permission: keyof typeof ROLE_PERMISSIONS.user): boolean {
  return ROLE_PERMISSIONS[userRole][permission]
}

export function canAccessAdmin(userRole: UserRole): boolean {
  return hasPermission(userRole, 'canAccessAdmin')
}

export function canManageUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, 'canManageUsers')
}
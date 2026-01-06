"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAdminAccess(requireAdminRole = false) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Get user from localStorage
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.push("/auth/login")
          return
        }

        const user = JSON.parse(userData)

        // Verify admin status with API
        const response = await fetch(`/api/admin/verify?userId=${user.id}`)
        const data = await response.json()

        if (!data.isAdmin) {
          router.push("/")
          return
        }

        // If admin role is specifically required, check for it
        if (requireAdminRole && data.role !== 'admin') {
          router.push("/")
          return
        }

        setIsAuthorized(true)
        setUserRole(data.role)
      } catch (error) {
        console.error("Admin access check failed:", error)
        router.push("/auth/login")
        return
      } finally {
        setCheckingAccess(false)
      }
    }

    checkAdminAccess()
  }, [router, requireAdminRole])

  return { isAuthorized, checkingAccess, userRole }
}
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin"
  avatar?: string
  isEmailVerified?: boolean
  authProvider?: "email" | "google"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check for existing session
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          localStorage.removeItem("user")
        }
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation
          if (email && password.length >= 6) {
            resolve(true)
          } else {
            reject(new Error("Invalid credentials"))
          }
        }, 1000)
      })

      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0] || "User",
        email,
        role: email.includes("admin") ? "admin" : "customer",
        isEmailVerified: true, // Email login users are considered verified
        authProvider: "email",
      }

      setUser(mockUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } catch (error) {
      throw new Error("Email atau password salah")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: Date.now().toString(),
        name: "Google User",
        email: "user@gmail.com",
        role: "customer",
        isEmailVerified: true, // Google users are always verified
        authProvider: "google",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      }

      setUser(mockUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } catch (error) {
      throw new Error("Gagal login dengan Google")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name && email && password.length >= 8) {
            resolve(true)
          } else {
            reject(new Error("Invalid data"))
          }
        }, 1000)
      })

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "customer",
        isEmailVerified: false, // New registrations need verification
        authProvider: "email",
      }

      setUser(mockUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } catch (error) {
      throw new Error("Gagal membuat akun")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

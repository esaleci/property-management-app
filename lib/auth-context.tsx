"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: number
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithDemo: () => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Demo user credentials
  const demoUser: User = {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    role: "admin",
  }

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("propertyManagerUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation - in a real app, this would be a backend call
    if (email === "admin@example.com" && password === "password") {
      const loggedInUser: User = {
        id: 1,
        name: "Admin User",
        email: email,
        role: "admin",
      }
      setUser(loggedInUser)
      localStorage.setItem("propertyManagerUser", JSON.stringify(loggedInUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Demo login function
  const loginWithDemo = async (): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(demoUser)
    localStorage.setItem("propertyManagerUser", JSON.stringify(demoUser))
    setIsLoading(false)
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("propertyManagerUser")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithDemo, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

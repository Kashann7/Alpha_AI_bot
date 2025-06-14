"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  isDemo?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      const userData = localStorage.getItem("user")

      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser)
          console.log("User loaded from localStorage:", parsedUser)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (token: string, userData: User) => {
    try {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

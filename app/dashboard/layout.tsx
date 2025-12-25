"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If no user, don't render anything while redirecting
  if (!user) {
    return null
  }

  // For authenticated users, render the dashboard layout
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="md:hidden">
            <MobileNav />
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="hidden md:block w-64 border-r p-4">
          <SidebarNav />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}

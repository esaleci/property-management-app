"use client"

import { PropertySearch } from "@/components/property-search"
import Link from "next/link"
import { Building2, Shield, Clock, MapPin, Heart, User, LogIn, LayoutDashboard, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const demoUser = {
  name: "John Smith",
  email: "john@propertymanager.com",
  role: "Admin",
  avatar: "JS",
}

export default function ClientHomePage() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("propertyFavorites")
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setFavoritesCount(favorites.length)
    }

    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    }

    // Listen for storage changes
    const handleStorage = () => {
      const saved = localStorage.getItem("propertyFavorites")
      if (saved) {
        setFavoritesCount(JSON.parse(saved).length)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Building2 className="w-7 h-7" />
              PropertyManager
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
                Home
              </Link>
              <Link
                href="/properties"
                className="text-muted-foreground hover:text-primary font-medium transition-colors"
              >
                Properties
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button
                variant={showFavoritesOnly ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex items-center gap-2"
              >
                <Heart className={`w-5 h-5 ${showFavoritesOnly ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">Favorites</span>
                {favoritesCount > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-xs rounded-full ${showFavoritesOnly ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {isLoggedIn ? (
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                        {demoUser.avatar}
                      </div>
                      <span className="hidden sm:inline">{demoUser.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span className="font-semibold">{demoUser.name}</span>
                          <span className="text-xs text-muted-foreground">{demoUser.email}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                        <LogIn className="w-4 h-4 mr-2 rotate-180" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel>Demo Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-2 text-xs text-muted-foreground">
                        <p>
                          <strong>Email:</strong> {demoUser.email}
                        </p>
                        <p>
                          <strong>Password:</strong> demo123
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login as Demo User
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Find Your Perfect Home</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover 35+ premium properties in New York. From cozy studios to luxury penthouses, find your ideal space.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">Verified Listings</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">New York Area</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PropertySearch showFavoritesOnly={showFavoritesOnly} onFavoritesChange={(count) => setFavoritesCount(count)} />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                <Building2 className="w-6 h-6" />
                PropertyManager
              </Link>
              <p className="text-muted-foreground text-sm">
                Your trusted partner in finding the perfect property in New York.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Property Types</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground text-sm">Apartments</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Houses</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Condos</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Penthouses</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground text-sm">info@propertymanager.com</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">+1 (212) 555-0100</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">New York, NY 10001</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">© 2025 PropertyManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

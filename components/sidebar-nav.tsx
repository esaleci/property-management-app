"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, Users, Wrench, FileText, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: <Building className="h-4 w-4" />,
    },
    {
      title: "Tenants",
      href: "/dashboard/tenants",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Maintenance",
      href: "/dashboard/maintenance",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href && "bg-accent text-accent-foreground",
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

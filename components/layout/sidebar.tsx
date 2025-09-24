"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Bed,
  Users,
  TrendingUp,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hotel,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reservaciones", href: "/reservations", icon: Calendar },
  { name: "Habitaciones", href: "/rooms", icon: Bed },
  { name: "Huéspedes", href: "/guests", icon: Users },
  { name: "Revenue", href: "/revenue", icon: TrendingUp },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}

      <div
        className={cn(
          "flex flex-col h-screen bg-card border-r border-border transition-all duration-300 z-50",
          "hidden md:flex",
          collapsed ? "w-16" : "w-64",
          "md:relative fixed inset-y-0 left-0",
          mobileOpen ? "flex w-64" : "hidden md:flex",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-lg font-bold text-foreground">Villa Magna</h1>
                <p className="text-xs text-muted-foreground">Family Resorts</p>
              </div>
            </div>
          )}
          {collapsed && <Hotel className="h-8 w-8 text-accent mx-auto" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors hidden md:block"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-muted group",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                  collapsed && "justify-center px-2 md:px-2",
                )}
              >
                <item.icon
                  className={cn(
                    collapsed ? "h-6 w-6" : "h-5 w-5",
                    "transition-colors flex-shrink-0",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                {(!collapsed || mobileOpen) && (
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      isActive ? "text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg bg-muted",
              collapsed && !mobileOpen && "justify-center",
            )}
          >
            <div
              className={cn(
                "rounded-full bg-accent flex items-center justify-center",
                collapsed && !mobileOpen ? "h-10 w-10" : "h-8 w-8",
              )}
            >
              <span
                className={cn("font-medium text-accent-foreground", collapsed && !mobileOpen ? "text-base" : "text-sm")}
              >
                VM
              </span>
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Villa Magna Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@villamagna.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

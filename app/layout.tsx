import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Villa Magna Family Resorts - Sistema de Gestión Hotelera",
  description: "Sistema inteligente de gestión hotelera con IA para Villa Magna Family Resorts",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-auto pt-16 md:pt-0">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

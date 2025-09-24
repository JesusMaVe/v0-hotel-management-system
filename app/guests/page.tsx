"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { GuestProfile } from "@/components/guests/guest-profile"
import { RecommendationEngine } from "@/components/ai/recommendation-engine"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockGuest = {
  id: "guest-001",
  name: "Ana María González Herrera",
  email: "ana.gonzalez@email.com",
  phone: "+52 55 1234 5678",
  city: "Ciudad de México",
  totalVisits: 8,
  totalSpent: 45600,
  averageStay: 3.2,
  lastVisit: "2025-08-15",
  preferences: {
    dietary: ["vegetariana", "sin gluten"],
    services: ["spa", "restaurante", "late checkout"],
    roomType: "Suite Ejecutiva",
    amenities: ["vista jardín", "balcón", "minibar", "wifi"],
  },
  satisfactionScore: 4.8,
  loyaltyTier: "gold" as const,
  aiInsights: {
    spendingPattern: "Alto gasto en servicios adicionales, especialmente spa y restaurante",
    preferredSeason: "Primavera y Otoño - evita temporadas altas",
    upsellProbability: 85,
    churnRisk: "low" as const,
    nextVisitPrediction: "Probable visita en Noviembre 2025 basado en patrones históricos",
  },
}

const mockRecommendations = [
  {
    id: "rec-001",
    type: "upsell" as const,
    title: "Upgrade a Suite Presidencial",
    description:
      "Ana María tiene alta probabilidad de aceptar upgrade basado en su historial de gastos en servicios premium",
    confidence: 92,
    potentialRevenue: 2800,
    targetGuest: "Ana María González",
    priority: "high" as const,
    category: "room",
    actionRequired: "Ofrecer upgrade durante check-in con descuento del 15%",
    estimatedImpact: "Incremento del 40% en satisfacción y 25% en ingresos por estancia",
  },
  {
    id: "rec-002",
    type: "service" as const,
    title: "Paquete Spa Personalizado",
    description: "Crear paquete spa exclusivo basado en preferencias de relajación y tratamientos anteriores",
    confidence: 88,
    potentialRevenue: 1200,
    targetGuest: "Ana María González",
    priority: "medium" as const,
    category: "wellness",
    actionRequired: "Contactar 48h antes de llegada con oferta personalizada",
    estimatedImpact: "85% probabilidad de aceptación, mejora NPS en 15 puntos",
  },
  {
    id: "rec-003",
    type: "experience" as const,
    title: "Experiencia Gastronómica Vegetariana",
    description: "Menú degustación especial con chef personalizado para huéspedes vegetarianos VIP",
    confidence: 78,
    potentialRevenue: 800,
    targetGuest: "Ana María González",
    priority: "medium" as const,
    category: "dining",
    actionRequired: "Coordinar con chef ejecutivo para menú especial",
    estimatedImpact: "Diferenciación premium, incremento en recomendaciones del 30%",
  },
  {
    id: "rec-004",
    type: "retention" as const,
    title: "Programa de Fidelización Personalizado",
    description: "Ofrecer beneficios exclusivos para mantener engagement de huéspedes gold",
    confidence: 95,
    potentialRevenue: 5600,
    priority: "critical" as const,
    category: "loyalty",
    actionRequired: "Activar beneficios automáticos en sistema CRM",
    estimatedImpact: "Reducción del 60% en riesgo de churn, incremento en frecuencia de visitas",
  },
  {
    id: "rec-005",
    type: "pricing" as const,
    title: "Optimización de Tarifas Dinámicas",
    description: "Ajustar precios basado en demanda predictiva y comportamiento de huéspedes similares",
    confidence: 82,
    potentialRevenue: 3200,
    priority: "high" as const,
    category: "revenue",
    actionRequired: "Implementar algoritmo de pricing dinámico para próximas 2 semanas",
    estimatedImpact: "Incremento del 12% en RevPAR sin afectar ocupación",
  },
]

export default function GuestsPage() {
  const [recommendations, setRecommendations] = useState(mockRecommendations)

  const handleApplyRecommendation = (id: string) => {
    console.log("Aplicando recomendación:", id)
    // TODO: Implement recommendation application logic
  }

  const handleDismissRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Gestión de Huéspedes"
        subtitle="Perfiles 360°, recomendaciones de IA y personalización de servicios"
      />

      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil del Huésped</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones IA</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <GuestProfile guest={mockGuest} recommendations={recommendations} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationEngine
              recommendations={recommendations}
              onApplyRecommendation={handleApplyRecommendation}
              onDismissRecommendation={handleDismissRecommendation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

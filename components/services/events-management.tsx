"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, DollarSign, Calendar, Wifi, Projector, Volume2, Snowflake, Plus, Search, Clock } from "lucide-react"

const eventData = {
  salones: [
    {
      id: "salon_magna",
      nombre: "Salón Magna",
      capacidad: 150,
      equipamiento: ["proyector", "audio", "wifi", "aire_acondicionado"],
      precioPorHora: 2500,
      disponibilidad: {
        "2025-09-25": ["09:00-17:00"],
        "2025-09-26": ["disponible_completo"],
      },
    },
    {
      id: "salon_imperial",
      nombre: "Salón Imperial",
      capacidad: 80,
      equipamiento: ["proyector", "wifi", "aire_acondicionado"],
      precioPorHora: 1800,
      disponibilidad: {
        "2025-09-25": ["disponible_completo"],
        "2025-09-26": ["10:00-14:00", "18:00-22:00"],
      },
    },
    {
      id: "terraza_eventos",
      nombre: "Terraza de Eventos",
      capacidad: 200,
      equipamiento: ["audio", "wifi"],
      precioPorHora: 3000,
      disponibilidad: {
        "2025-09-25": ["19:00-23:00"],
        "2025-09-26": ["disponible_completo"],
      },
    },
  ],
}

export function EventsManagement() {
  const [selectedDate, setSelectedDate] = useState("2025-09-25")

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment) {
      case "proyector":
        return <Projector className="h-4 w-4" />
      case "audio":
        return <Volume2 className="h-4 w-4" />
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "aire_acondicionado":
        return <Snowflake className="h-4 w-4" />
      default:
        return null
    }
  }

  const getEquipmentLabel = (equipment: string) => {
    switch (equipment) {
      case "proyector":
        return "Proyector"
      case "audio":
        return "Sistema de Audio"
      case "wifi":
        return "WiFi"
      case "aire_acondicionado":
        return "Aire Acondicionado"
      default:
        return equipment
    }
  }

  const getAvailabilityStatus = (salon: any, date: string) => {
    const availability = salon.disponibilidad[date]
    if (!availability) return { status: "no_disponible", text: "No disponible" }
    if (availability.includes("disponible_completo")) return { status: "disponible", text: "Disponible todo el día" }
    return { status: "parcial", text: availability.join(", ") }
  }

  return (
    <div className="space-y-6 px-2.5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestión de Eventos</h2>
          <p className="text-muted-foreground">Administra salones, equipamiento y reservas de eventos</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="date-select" className="text-sm font-medium mb-2 block">
            Seleccionar Fecha
          </Label>
          <Input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="flex-1">
          <Label className="text-sm font-medium mb-2 block">Buscar Salón</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nombre o capacidad..." className="pl-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {eventData.salones.map((salon) => {
          const availability = getAvailabilityStatus(salon, selectedDate)

          return (
            <Card key={salon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{salon.nombre}</CardTitle>
                  <Badge
                    variant={
                      availability.status === "disponible"
                        ? "default"
                        : availability.status === "parcial"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {availability.status === "disponible"
                      ? "Disponible"
                      : availability.status === "parcial"
                        ? "Parcial"
                        : "Ocupado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{salon.capacidad} personas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${salon.precioPorHora}/hora</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Equipamiento</Label>
                  <div className="flex flex-wrap gap-2">
                    {salon.equipamiento.map((equipo, index) => (
                      <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                        {getEquipmentIcon(equipo)}
                        {getEquipmentLabel(equipo)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Disponibilidad</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{availability.text}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" disabled={availability.status === "no_disponible"}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Reservar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

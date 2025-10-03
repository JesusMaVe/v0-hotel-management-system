"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, Calendar, Wifi, Projector, Volume2, Snowflake, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface EventDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  salon?: {
    id: string
    nombre: string
    capacidad: number
    equipamiento: string[]
    precioPorHora: number
    disponibilidad: Record<string, string[]>
  }
  onBookNow?: () => void
}

export function EventDetailsDialog({ open, onOpenChange, salon, onBookNow }: EventDetailsDialogProps) {
  if (!salon) return null

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
        return "Proyector HD"
      case "audio":
        return "Sistema de Audio Profesional"
      case "wifi":
        return "WiFi de Alta Velocidad"
      case "aire_acondicionado":
        return "Aire Acondicionado"
      default:
        return equipment
    }
  }

  const getAvailabilityColor = (slots: string[]) => {
    if (!slots || slots.length === 0) return "bg-red-500/10 text-red-500 border-red-500/20"
    if (slots.includes("disponible_completo")) return "bg-green-500/10 text-green-500 border-green-500/20"
    return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  }

  const formatAvailability = (slots: string[]) => {
    if (!slots || slots.length === 0) return "No disponible"
    if (slots.includes("disponible_completo")) return "Disponible todo el día"
    return slots.join(", ")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {salon.nombre}
            </DialogTitle>
            <Badge variant="outline" className="text-sm">
              ID: {salon.id}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Main Info */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-medium">Capacidad</span>
                  </div>
                  <p className="text-2xl font-bold">{salon.capacidad} personas</p>
                  <p className="text-sm text-muted-foreground">Configuración estándar</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-sm font-medium">Precio por Hora</span>
                  </div>
                  <p className="text-2xl font-bold text-accent">${salon.precioPorHora.toLocaleString()} MXN</p>
                  <p className="text-sm text-muted-foreground">IVA incluido</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Equipment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Equipamiento Incluido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {salon.equipamiento.map((equipo, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="p-2 bg-accent/10 rounded-md">{getEquipmentIcon(equipo)}</div>
                  <span className="text-sm font-medium">{getEquipmentLabel(equipo)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Disponibilidad Próximos Días</h3>
            </div>

            <div className="space-y-3">
              {Object.entries(salon.disponibilidad).map(([fecha, horarios], index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {new Date(fecha).toLocaleDateString("es-MX", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatAvailability(horarios)}</p>
                    </div>
                    <Badge className={getAvailabilityColor(horarios)}>
                      {horarios.includes("disponible_completo")
                        ? "Disponible"
                        : horarios.length > 0
                          ? "Parcial"
                          : "Ocupado"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Adicional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Configuraciones Disponibles</p>
                <p>Teatro, Banquete, Reunión, Aula</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Servicios Opcionales</p>
                <p>Catering, Decoración, Fotografía</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Área del Salón</p>
                <p>
                  {salon.capacidad > 150
                    ? "250 m²"
                    : salon.capacidad > 100
                      ? "180 m²"
                      : salon.capacidad > 50
                        ? "120 m²"
                        : "80 m²"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Tiempo Mínimo de Renta</p>
                <p>2 horas</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cerrar
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false)
                if (onBookNow) onBookNow()
              }}
              className="flex-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Reservar Ahora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

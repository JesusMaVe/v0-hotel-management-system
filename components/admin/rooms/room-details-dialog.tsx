"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, Wifi, Car, Coffee, Tv, Wind, Droplets, Calendar, Clock, DollarSign } from "lucide-react"

interface Room {
  id: string
  number: string
  floor: number
  type: "standard" | "suite" | "ejecutiva" | "presidencial"
  status: "available" | "occupied" | "cleaning" | "maintenance" | "out-of-order"
  guest?: string
  checkOut?: string
  capacity: number
  amenities: string[]
  price: number
  lastCleaned?: string
  maintenanceNotes?: string
}

interface RoomDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: Room | null
}

export function RoomDetailsDialog({ open, onOpenChange, room }: RoomDetailsDialogProps) {
  if (!room) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success/10 text-success border-success/20"
      case "occupied":
        return "bg-accent/10 text-accent border-accent/20"
      case "cleaning":
        return "bg-warning/10 text-warning border-warning/20"
      case "maintenance":
        return "bg-error/10 text-error border-error/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "occupied":
        return "Ocupada"
      case "cleaning":
        return "Limpieza"
      case "maintenance":
        return "Mantenimiento"
      default:
        return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "standard":
        return "Standard"
      case "suite":
        return "Suite"
      case "ejecutiva":
        return "Ejecutiva"
      case "presidencial":
        return "Presidencial"
      default:
        return type
    }
  }

  const getAmenityDetails = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return { icon: <Wifi className="h-4 w-4" />, label: "WiFi de Alta Velocidad" }
      case "parking":
        return { icon: <Car className="h-4 w-4" />, label: "Estacionamiento Privado" }
      case "minibar":
        return { icon: <Coffee className="h-4 w-4" />, label: "Minibar Premium" }
      case "tv":
        return { icon: <Tv className="h-4 w-4" />, label: 'TV Smart 55"' }
      case "ac":
        return { icon: <Wind className="h-4 w-4" />, label: "Aire Acondicionado" }
      case "jacuzzi":
        return { icon: <Droplets className="h-4 w-4" />, label: "Jacuzzi Privado" }
      default:
        return { icon: null, label: amenity }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center flex-row justify-around">
            <span>Detalles de Habitación {room.number}</span>
            <Badge className={getStatusColor(room.status)} variant="outline">
              {getStatusText(room.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tipo de Habitación</p>
              <p className="text-lg font-semibold text-foreground">{getTypeText(room.type)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Piso</p>
              <p className="text-lg font-semibold text-foreground">Piso {room.floor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Capacidad</p>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-accent" />
                <p className="text-lg font-semibold text-foreground">{room.capacity} personas</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Precio por Noche</p>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-success" />
                <p className="text-lg font-semibold text-foreground">${room.price}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Guest Info */}
          {room.guest && (
            <>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h4 className="font-semibold text-foreground mb-3">Información del Huésped</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">{room.guest}</span>
                  </div>
                  {room.checkOut && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Check-out: {room.checkOut}</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Amenities */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Amenidades</h4>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities.map((amenity, index) => {
                const details = getAmenityDetails(amenity)
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                    <div className="p-2 rounded bg-accent/10 text-accent">{details.icon}</div>
                    <span className="text-sm text-foreground">{details.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Maintenance Notes */}
          {room.maintenanceNotes && (
            <>
              <div className="p-4 rounded-lg bg-error/10 border border-error/20">
                <h4 className="font-semibold text-error mb-2">Notas de Mantenimiento</h4>
                <p className="text-sm text-muted-foreground">{room.maintenanceNotes}</p>
              </div>
              <Separator />
            </>
          )}

          {/* Last Cleaned */}
          {room.lastCleaned && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Última limpieza: {room.lastCleaned}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

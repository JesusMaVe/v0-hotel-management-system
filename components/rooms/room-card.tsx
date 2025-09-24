"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Bed,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Droplets,
  Settings,
  UserCheck,
  Clock,
  AlertTriangle,
} from "lucide-react"

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

interface RoomCardProps {
  room: Room
  onAssign?: (roomId: string) => void
  onClean?: (roomId: string) => void
  onMaintenance?: (roomId: string) => void
  onViewDetails?: (roomId: string) => void
}

export function RoomCard({ room, onAssign, onClean, onMaintenance, onViewDetails }: RoomCardProps) {
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
      case "out-of-order":
        return "bg-destructive/10 text-destructive border-destructive/20"
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
      case "out-of-order":
        return "Fuera de Servicio"
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-3 w-3" />
      case "parking":
        return <Car className="h-3 w-3" />
      case "minibar":
        return <Coffee className="h-3 w-3" />
      case "tv":
        return <Tv className="h-3 w-3" />
      case "ac":
        return <Wind className="h-3 w-3" />
      case "jacuzzi":
        return <Droplets className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-200 hover:border-accent/50 cursor-pointer",
        room.status === "available" && "hover:bg-success/5",
        room.status === "occupied" && "hover:bg-accent/5",
        room.status === "maintenance" && "hover:bg-error/5",
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-foreground">{room.number}</h3>
            <span className="text-sm text-muted-foreground">Piso {room.floor}</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{getTypeText(room.type)}</p>
        </div>
        <Badge className={getStatusColor(room.status)} variant="outline">
          {getStatusText(room.status)}
        </Badge>
      </div>

      {/* Guest Info */}
      {room.guest && (
        <div className="mb-3 p-2 rounded-lg bg-muted">
          <div className="flex items-center space-x-2 mb-1">
            <UserCheck className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">{room.guest}</span>
          </div>
          {room.checkOut && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Check-out: {room.checkOut}</span>
            </div>
          )}
        </div>
      )}

      {/* Room Details */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span>${room.price}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex items-center space-x-2 mb-4">
        {room.amenities.slice(0, 4).map((amenity, index) => (
          <div key={index} className="p-1.5 rounded bg-accent/10 text-accent">
            {getAmenityIcon(amenity)}
          </div>
        ))}
        {room.amenities.length > 4 && (
          <span className="text-xs text-muted-foreground">+{room.amenities.length - 4}</span>
        )}
      </div>

      {/* Maintenance Notes */}
      {room.maintenanceNotes && (
        <div className="mb-3 p-2 rounded-lg bg-error/10 border border-error/20">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-error" />
            <span className="text-sm text-error font-medium">Mantenimiento</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{room.maintenanceNotes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {room.status === "available" && onAssign && (
          <Button size="sm" className="flex-1">
            Asignar
          </Button>
        )}
        {(room.status === "available" || room.status === "occupied") && onClean && (
          <Button size="sm" variant="outline" onClick={() => onClean(room.id)}>
            <Settings className="h-4 w-4" />
          </Button>
        )}
        {onMaintenance && (
          <Button size="sm" variant="ghost" onClick={() => onMaintenance(room.id)}>
            <AlertTriangle className="h-4 w-4" />
          </Button>
        )}
        {onViewDetails && (
          <Button size="sm" variant="ghost" onClick={() => onViewDetails(room.id)}>
            Ver
          </Button>
        )}
      </div>

      {/* Last Cleaned */}
      {room.lastCleaned && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Última limpieza: {room.lastCleaned}</p>
        </div>
      )}
    </Card>
  )
}

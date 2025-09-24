"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react"

interface Reservation {
  id: string
  guestName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  roomType: string
  roomNumber?: string
  status: "confirmed" | "pending" | "checked-in" | "checked-out" | "cancelled"
  totalAmount: number
  guests: number
  specialRequests?: string
}

interface ReservationCardProps {
  reservation: Reservation
  onCheckIn?: (id: string) => void
  onCheckOut?: (id: string) => void
  onEdit?: (id: string) => void
}

export function ReservationCard({ reservation, onCheckIn, onCheckOut, onEdit }: ReservationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-accent/10 text-accent border-accent/20"
      case "pending":
        return "bg-warning/10 text-warning border-warning/20"
      case "checked-in":
        return "bg-success/10 text-success border-success/20"
      case "checked-out":
        return "bg-muted text-muted-foreground border-border"
      case "cancelled":
        return "bg-error/10 text-error border-error/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "checked-in":
        return "Check-in"
      case "checked-out":
        return "Check-out"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  return (
    <Card className="p-6 hover:border-accent/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <User className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{reservation.guestName}</h3>
            <p className="text-sm text-muted-foreground">#{reservation.id}</p>
          </div>
        </div>
        <Badge className={getStatusColor(reservation.status)} variant="outline">
          {getStatusText(reservation.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Check-in:</span>
          <span className="font-medium text-foreground">{reservation.checkIn}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Check-out:</span>
          <span className="font-medium text-foreground">{reservation.checkOut}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Habitación:</span>
          <span className="font-medium text-foreground">
            {reservation.roomNumber ? `${reservation.roomNumber} (${reservation.roomType})` : reservation.roomType}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Teléfono:</span>
          <span className="font-medium text-foreground">{reservation.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold text-foreground">${reservation.totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          {reservation.status === "confirmed" && onCheckIn && (
            <Button size="sm" onClick={() => onCheckIn(reservation.id)}>
              Check-in
            </Button>
          )}
          {reservation.status === "checked-in" && onCheckOut && (
            <Button size="sm" variant="outline" onClick={() => onCheckOut(reservation.id)}>
              Check-out
            </Button>
          )}
          {onEdit && (
            <Button size="sm" variant="ghost" onClick={() => onEdit(reservation.id)}>
              Editar
            </Button>
          )}
        </div>
      </div>

      {reservation.specialRequests && (
        <div className="mt-4 p-3 rounded-lg bg-muted">
          <p className="text-sm font-medium text-foreground mb-1">Solicitudes Especiales</p>
          <p className="text-sm text-muted-foreground">{reservation.specialRequests}</p>
        </div>
      )}
    </Card>
  )
}

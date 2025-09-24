"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

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

interface EditReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
  onUpdate: (id: string, updatedData: Partial<Reservation>) => void
}

export function EditReservationDialog({ open, onOpenChange, reservation, onUpdate }: EditReservationDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<Reservation>>({})
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  useEffect(() => {
    if (reservation) {
      setFormData(reservation)
      setCheckInDate(new Date(reservation.checkIn))
      setCheckOutDate(new Date(reservation.checkOut))
    }
  }, [reservation])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reservation) return

    const updatedData = {
      ...formData,
      checkIn: checkInDate ? format(checkInDate, "yyyy-MM-dd") : reservation.checkIn,
      checkOut: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : reservation.checkOut,
    }

    onUpdate(reservation.id, updatedData)

    toast({
      title: "Reservación Actualizada",
      description: `La reservación ${reservation.id} ha sido actualizada exitosamente`,
    })

    onOpenChange(false)
  }

  if (!reservation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Reservación {reservation.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Información del Huésped</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Nombre Completo</Label>
                <Input
                  id="guestName"
                  value={formData.guestName || ""}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Número de Huéspedes</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.guests || 1}
                  onChange={(e) => setFormData({ ...formData, guests: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Detalles de la Reservación</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Fecha de Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Tipo de Habitación</Label>
                <Select
                  value={formData.roomType || ""}
                  onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="Ejecutiva">Ejecutiva</SelectItem>
                    <SelectItem value="Suite Ejecutiva">Suite Ejecutiva</SelectItem>
                    <SelectItem value="Presidencial">Presidencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Número de Habitación</Label>
                <Input
                  id="roomNumber"
                  value={formData.roomNumber || ""}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="Ej: 101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status || ""}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="confirmed">Confirmada</SelectItem>
                    <SelectItem value="checked-in">Check-in</SelectItem>
                    <SelectItem value="checked-out">Check-out</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Monto Total</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  min="0"
                  value={formData.totalAmount || 0}
                  onChange={(e) => setFormData({ ...formData, totalAmount: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Solicitudes Especiales</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests || ""}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Ej: Vista al jardín, late check-out, dieta vegetariana..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, Mail, Phone, Users } from "lucide-react"

interface NewReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (reservation: any) => void
}

export function NewReservationDialog({ open, onOpenChange, onSubmit }: NewReservationDialogProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    guests: "1",
    specialRequests: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReservation = {
      id: `RES-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      guestName: formData.guestName,
      email: formData.email,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      roomType: formData.roomType,
      roomNumber: undefined,
      status: "pending" as const,
      totalAmount: calculateAmount(formData.roomType, formData.checkIn, formData.checkOut),
      guests: Number.parseInt(formData.guests),
      specialRequests: formData.specialRequests || undefined,
    }

    onSubmit(newReservation)
    onOpenChange(false)

    // Reset form
    setFormData({
      guestName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      roomType: "",
      guests: "1",
      specialRequests: "",
    })
  }

  const calculateAmount = (roomType: string, checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0

    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))

    const rates: Record<string, number> = {
      Standard: 1400,
      Ejecutiva: 2800,
      Suite: 4200,
      "Suite Ejecutiva": 5600,
      Presidencial: 8400,
    }

    return (rates[roomType] || 0) * nights
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nueva Reservación</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Huésped
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Nombre Completo *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Ej: Juan Pérez García"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Número de Huéspedes *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Detalles de la Reservación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn">Fecha de Entrada *</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut">Fecha de Salida *</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  min={formData.checkIn || new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="roomType">Tipo de Habitación *</Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard - $1,400/noche</SelectItem>
                    <SelectItem value="Ejecutiva">Ejecutiva - $2,800/noche</SelectItem>
                    <SelectItem value="Suite">Suite - $4,200/noche</SelectItem>
                    <SelectItem value="Suite Ejecutiva">Suite Ejecutiva - $5,600/noche</SelectItem>
                    <SelectItem value="Presidencial">Presidencial - $8,400/noche</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.roomType && formData.checkIn && formData.checkOut && (
                <div className="md:col-span-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Estimado:</span>
                    <span className="text-2xl font-bold text-blue-400">
                      ${calculateAmount(formData.roomType, formData.checkIn, formData.checkOut).toLocaleString()} MXN
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Solicitudes Especiales</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Ej: Vista al jardín, cuna para bebé, late check-out..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Reservación</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

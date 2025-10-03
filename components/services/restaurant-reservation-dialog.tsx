"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, Users, Clock } from "lucide-react"

interface RestaurantReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (reservation: any) => void
  preselectedTable?: number
}

export function RestaurantReservationDialog({
  open,
  onOpenChange,
  onSubmit,
  preselectedTable,
}: RestaurantReservationDialogProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    numberOfGuests: "2",
    tableNumber: preselectedTable?.toString() || "",
    date: "",
    time: "",
    specialRequests: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReservation = {
      id: `REST-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      guestName: formData.guestName,
      numberOfGuests: Number.parseInt(formData.numberOfGuests),
      tableNumber: formData.tableNumber ? Number.parseInt(formData.tableNumber) : undefined,
      date: formData.date,
      time: formData.time,
      specialRequests: formData.specialRequests || undefined,
      status: "confirmed" as const,
    }

    if (onSubmit) {
      onSubmit(newReservation)
    }
    onOpenChange(false)

    // Reset form
    setFormData({
      guestName: "",
      numberOfGuests: "2",
      tableNumber: "",
      date: "",
      time: "",
      specialRequests: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nueva Reserva de Restaurante</DialogTitle>
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
                <Label htmlFor="numberOfGuests">Número de Comensales *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="numberOfGuests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
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
              Detalles de la Reserva
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tableNumber">Número de Mesa (Opcional)</Label>
                <Select
                  value={formData.tableNumber}
                  onValueChange={(value) => setFormData({ ...formData, tableNumber: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una mesa o déjalo en automático" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Mesa 5 - Capacidad 8 (Salón Privado)</SelectItem>
                    <SelectItem value="8">Mesa 8 - Capacidad 6 (Interior)</SelectItem>
                    <SelectItem value="12">Mesa 12 - Capacidad 2 (Terraza)</SelectItem>
                    <SelectItem value="15">Mesa 15 - Capacidad 4 (Terraza)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Solicitudes Especiales</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Ej: Preferencia de ubicación, restricciones alimentarias, celebración especial..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Reserva</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

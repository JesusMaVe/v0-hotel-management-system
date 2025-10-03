"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Clock, DollarSign, MapPin } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface BookEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (reservation: any) => void
  selectedSalon?: {
    id: string
    nombre: string
    capacidad: number
    equipamiento: string[]
    precioPorHora: number
  }
}

export function BookEventDialog({ open, onOpenChange, onSubmit, selectedSalon }: BookEventDialogProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    services: {
      catering: false,
      decoracion: false,
    },
    specialRequests: "",
  })

  useEffect(() => {
    if (!open) {
      // Reset form when dialog closes
      setFormData({
        eventName: "",
        date: "",
        startTime: "",
        endTime: "",
        attendees: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        services: {
          catering: false,
          decoracion: false,
        },
        specialRequests: "",
      })
    }
  }, [open])

  const calculateTotal = () => {
    if (!selectedSalon || !formData.startTime || !formData.endTime) return 0

    const start = new Date(`2000-01-01T${formData.startTime}`)
    const end = new Date(`2000-01-01T${formData.endTime}`)
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))

    let total = selectedSalon.precioPorHora * Math.max(hours, 1)

    // Agregar costos de servicios adicionales
    if (formData.services.catering) total += 500 * Number(formData.attendees || 0)
    if (formData.services.decoracion) total += 5000

    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newReservation = {
      id: `BOOK-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      eventName: formData.eventName,
      salonId: selectedSalon?.id,
      salonName: selectedSalon?.nombre,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      attendees: Number.parseInt(formData.attendees),
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      services: Object.entries(formData.services)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      specialRequests: formData.specialRequests || undefined,
      totalAmount: calculateTotal(),
      status: "confirmed" as const,
    }

    if (onSubmit) {
      onSubmit(newReservation)
    }
    onOpenChange(false)
  }

  if (!selectedSalon) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Reservar {selectedSalon.nombre}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Salon Info */}
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">{selectedSalon.nombre}</h3>
              </div>
              <Badge variant="outline">Disponible</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Capacidad: {selectedSalon.capacidad} personas</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>${selectedSalon.precioPorHora}/hora</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Equipamiento incluido:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSalon.equipamiento.map((equipo, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {equipo}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Event Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información del Evento</h3>

            <div className="space-y-2">
              <Label htmlFor="eventName">Nombre del Evento *</Label>
              <Input
                id="eventName"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="Ej: Conferencia Empresarial 2025"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fecha y Horario
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="startTime">Hora de Inicio *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Hora de Finalización *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendees">Número de Asistentes *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="attendees"
                    type="number"
                    min="1"
                    max={selectedSalon.capacidad}
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="pl-10"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Nombre de Contacto *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Teléfono *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+52 55 1234 5678"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios Adicionales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="catering"
                  checked={formData.services.catering}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, catering: checked as boolean },
                    })
                  }
                />
                <label htmlFor="catering" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Servicio de Catering ($500/persona)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decoracion"
                  checked={formData.services.decoracion}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, decoracion: checked as boolean },
                    })
                  }
                />
                <label htmlFor="decoracion" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Decoración Especial ($5,000)
                </label>
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
              placeholder="Ej: Configuración específica de mesas, requisitos técnicos adicionales..."
              rows={3}
            />
          </div>

          {/* Total Amount */}
          {formData.startTime && formData.endTime && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Total Estimado:</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">${calculateTotal().toLocaleString()} MXN</span>
              </div>
            </div>
          )}

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

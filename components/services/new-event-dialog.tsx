"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Clock, DollarSign, Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface NewEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (event: any) => void
}

export function NewEventDialog({ open, onOpenChange, onSubmit }: NewEventDialogProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    salon: "",
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    services: {
      proyector: false,
      audio: false,
      wifi: false,
      catering: false,
      decoracion: false,
    },
    specialRequests: "",
  })

  const salonPrices: Record<string, number> = {
    salon_magna: 2500,
    salon_imperial: 1800,
    terraza_eventos: 3000,
  }

  const calculateTotal = () => {
    if (!formData.salon || !formData.startTime || !formData.endTime) return 0

    const start = new Date(`2000-01-01T${formData.startTime}`)
    const end = new Date(`2000-01-01T${formData.endTime}`)
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))

    const pricePerHour = salonPrices[formData.salon] || 0
    let total = pricePerHour * Math.max(hours, 1)

    // Agregar costos de servicios adicionales
    if (formData.services.catering) total += 500 * Number(formData.attendees || 0)
    if (formData.services.decoracion) total += 5000

    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEvent = {
      id: `EVT-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      eventName: formData.eventName,
      salon: formData.salon,
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
      onSubmit(newEvent)
    }
    onOpenChange(false)

    // Reset form
    setFormData({
      eventName: "",
      salon: "",
      date: "",
      startTime: "",
      endTime: "",
      attendees: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      services: {
        proyector: false,
        audio: false,
        wifi: false,
        catering: false,
        decoracion: false,
      },
      specialRequests: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nuevo Evento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Event Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Información del Evento
            </h3>

            <div className="grid grid-cols-1 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="salon">Salón *</Label>
                <Select value={formData.salon} onValueChange={(value) => setFormData({ ...formData, salon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un salón" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salon_magna">Salón Magna - 150 personas ($2,500/hora)</SelectItem>
                    <SelectItem value="salon_imperial">Salón Imperial - 80 personas ($1,800/hora)</SelectItem>
                    <SelectItem value="terraza_eventos">Terraza de Eventos - 200 personas ($3,000/hora)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    max="200"
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

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios Adicionales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="proyector"
                  checked={formData.services.proyector}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, proyector: checked as boolean },
                    })
                  }
                />
                <label htmlFor="proyector" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Proyector
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="audio"
                  checked={formData.services.audio}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, audio: checked as boolean },
                    })
                  }
                />
                <label htmlFor="audio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Sistema de Audio
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={formData.services.wifi}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, wifi: checked as boolean },
                    })
                  }
                />
                <label htmlFor="wifi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  WiFi de Alta Velocidad
                </label>
              </div>

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
          {formData.salon && formData.startTime && formData.endTime && (
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
            <Button type="submit">Crear Evento</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

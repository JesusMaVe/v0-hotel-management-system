"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Home, Calendar, Clock, MapPin, Car, Utensils, Waves } from "lucide-react"

interface NewConciergeRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (request: any) => void
}

export function NewConciergeRequestDialog({ open, onOpenChange, onSubmit }: NewConciergeRequestDialogProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    serviceType: "",
    date: "",
    time: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newRequest = {
      id: Math.floor(Math.random() * 1000) + 1,
      huesped: formData.guestName,
      habitacion: formData.roomNumber,
      servicio: getServiceLabel(formData.serviceType),
      estado: "pendiente" as const,
      fecha: formData.date,
      hora: formData.time,
      notas: formData.notes || undefined,
    }

    if (onSubmit) {
      onSubmit(newRequest)
    }
    onOpenChange(false)

    // Reset form
    setFormData({
      guestName: "",
      roomNumber: "",
      serviceType: "",
      date: "",
      time: "",
      notes: "",
    })
  }

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case "tour":
        return "Tour arqueológico"
      case "car":
        return "Renta de auto"
      case "restaurant":
        return "Reserva restaurante"
      case "activities":
        return "Actividades acuáticas"
      case "business":
        return "Business Center"
      case "other":
        return "Otro servicio"
      default:
        return serviceType
    }
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "tour":
        return <MapPin className="h-4 w-4" />
      case "car":
        return <Car className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "activities":
        return <Waves className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nueva Solicitud de Concierge</DialogTitle>
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
                <Label htmlFor="guestName">Nombre del Huésped *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Ej: Juan Pérez García"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomNumber">Número de Habitación *</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="roomNumber"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    placeholder="Ej: 205"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detalles del Servicio</h3>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Tipo de Servicio *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tour">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Tours a zonas arqueológicas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="car">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>Renta de autos</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="restaurant">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      <span>Reservas en restaurantes externos</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="activities">
                    <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4" />
                      <span>Actividades acuáticas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="business">Business Center</SelectItem>
                  <SelectItem value="other">Otro servicio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fecha y Hora Solicitada
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
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas y Detalles Adicionales *</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Ej: Interesado en Chichen Itzá, 4 personas. Salida desde el hotel a las 8:00 AM..."
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">
              Por favor proporciona todos los detalles necesarios: número de personas, preferencias, presupuesto, etc.
            </p>
          </div>

          {/* Information Box */}
          {formData.serviceType && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">{getServiceIcon(formData.serviceType)}</div>
                <div className="space-y-1">
                  <p className="font-medium text-blue-400">{getServiceLabel(formData.serviceType)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.serviceType === "tour" &&
                      "Nuestro equipo coordinará el tour y contactará contigo para confirmar detalles."}
                    {formData.serviceType === "car" &&
                      "Te contactaremos para confirmar el tipo de vehículo y período de renta."}
                    {formData.serviceType === "restaurant" &&
                      "Realizaremos la reserva en el restaurante de tu preferencia."}
                    {formData.serviceType === "activities" &&
                      "Te proporcionaremos información sobre actividades disponibles y precios."}
                    {formData.serviceType === "business" &&
                      "Los servicios del Business Center están disponibles 24/7."}
                    {formData.serviceType === "other" && "Procesaremos tu solicitud y te contactaremos pronto."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Enviar Solicitud</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Home, Calendar, Clock, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CatalogServiceRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: {
    id: number
    nombre: string
    precio: number
    duracion?: number
    capacidad?: number
    categoria: string
  }
  serviceType?: string
}

export function CatalogServiceRequestDialog({
  open,
  onOpenChange,
  service,
  serviceType,
}: CatalogServiceRequestDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    habitacion: "",
    fecha: "",
    hora: "",
    notas: "",
  })

  useEffect(() => {
    if (!open) {
      // Reset form when dialog closes
      setFormData({
        habitacion: "",
        fecha: "",
        hora: "",
        notas: "",
      })
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Solicitud enviada",
      description: `${service?.nombre} solicitado para ${formData.fecha} a las ${formData.hora}. Habitación ${formData.habitacion}`,
    })

    onOpenChange(false)
  }

  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Solicitar Servicio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Service Info */}
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{service.nombre}</h3>
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="text-sm">
                ${service.precio}
              </Badge>
              {service.duracion && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{service.duracion} min</span>
                </div>
              )}
              <Badge variant="outline" className="text-xs">
                {service.categoria}
              </Badge>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <Label htmlFor="habitacion">Número de Habitación *</Label>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="habitacion"
                value={formData.habitacion}
                onChange={(e) => setFormData({ ...formData, habitacion: e.target.value })}
                placeholder="Ej: 205"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha *</Label>
              <Input
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora">Hora *</Label>
              <Input
                id="hora"
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas o Preferencias</Label>
            <Textarea
              id="notas"
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              placeholder="Cualquier solicitud especial o preferencia..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Solicitud</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

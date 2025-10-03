"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface BookServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: any
}

export function BookServiceDialog({ open, onOpenChange, service }: BookServiceDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    habitacion: "",
    huespedes: "",
    fecha: "",
    hora: "",
    notas: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Reserva confirmada",
      description: `${service.nombre} reservado para ${formData.fecha} a las ${formData.hora}`,
    })
    onOpenChange(false)
    // Reset form
    setFormData({
      habitacion: "",
      huespedes: "",
      fecha: "",
      hora: "",
      notas: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reservar: {service?.nombre}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habitacion">Habitación</Label>
            <Input
              id="habitacion"
              value={formData.habitacion}
              onChange={(e) => setFormData({ ...formData, habitacion: e.target.value })}
              placeholder="Número de habitación"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="huespedes">Número de Huéspedes</Label>
            <Input
              id="huespedes"
              type="number"
              value={formData.huespedes}
              onChange={(e) => setFormData({ ...formData, huespedes: e.target.value })}
              placeholder="1"
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
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
            <Label htmlFor="hora">Hora</Label>
            <Select value={formData.hora} onValueChange={(value) => setFormData({ ...formData, hora: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar hora" />
              </SelectTrigger>
              <SelectContent>
                {service?.disponibilidad?.map((hora: string) => (
                  <SelectItem key={hora} value={hora}>
                    {hora}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas Especiales</Label>
            <Input
              id="notas"
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              placeholder="Preferencias o solicitudes especiales"
            />
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Precio:</span>
              <span className="font-bold">${service?.precio}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Reserva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

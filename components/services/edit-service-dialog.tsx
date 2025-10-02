"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface EditServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: any
}

export function EditServiceDialog({ open, onOpenChange, service }: EditServiceDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    duracion: "",
    terapeuta: "",
    sala: "",
  })

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre || "",
        precio: service.precio?.toString() || "",
        duracion: service.duracion?.toString() || "",
        terapeuta: service.terapeuta || "",
        sala: service.sala || "",
      })
    }
  }, [service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Servicio actualizado",
      description: `${formData.nombre} ha sido actualizado exitosamente.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Servicio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Servicio</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precio">Precio ($)</Label>
              <Input
                id="precio"
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion">Duración (min)</Label>
              <Input
                id="duracion"
                type="number"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
              />
            </div>
          </div>

          {service?.terapeuta && (
            <div className="space-y-2">
              <Label htmlFor="terapeuta">Terapeuta</Label>
              <Input
                id="terapeuta"
                value={formData.terapeuta}
                onChange={(e) => setFormData({ ...formData, terapeuta: e.target.value })}
              />
            </div>
          )}

          {service?.sala && (
            <div className="space-y-2">
              <Label htmlFor="sala">Sala</Label>
              <Input
                id="sala"
                value={formData.sala}
                onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
              />
            </div>
          )}

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

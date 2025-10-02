"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface NewServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceType: "spa" | "restaurant" | "events" | "concierge"
}

export function NewServiceDialog({ open, onOpenChange, serviceType }: NewServiceDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    duracion: "",
    categoria: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Servicio creado",
      description: `${formData.nombre} ha sido agregado exitosamente.`,
    })
    onOpenChange(false)
    setFormData({ nombre: "", descripcion: "", precio: "", duracion: "", categoria: "" })
  }

  const getCategoryOptions = () => {
    switch (serviceType) {
      case "spa":
        return ["Masajes", "Faciales", "Tratamientos Corporales", "Manicure/Pedicure"]
      case "restaurant":
        return ["Desayuno", "Comida", "Cena", "Bebidas", "Postres"]
      case "events":
        return ["Corporativo", "Social", "Boda", "Conferencia"]
      case "concierge":
        return ["Transporte", "Tours", "Reservaciones", "Asistencia"]
      default:
        return []
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Servicio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Servicio</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Masaje Relajante"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => setFormData({ ...formData, categoria: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {getCategoryOptions().map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe el servicio..."
              rows={3}
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
                placeholder="0.00"
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
                placeholder="60"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Servicio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

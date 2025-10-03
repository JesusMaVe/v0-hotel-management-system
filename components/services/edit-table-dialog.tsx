"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MapPin } from "lucide-react"

interface EditTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  table?: {
    numero: number
    capacidad: number
    ubicacion: string
    estado: string
  }
  onSubmit?: (tableData: any) => void
}

export function EditTableDialog({ open, onOpenChange, table, onSubmit }: EditTableDialogProps) {
  const [formData, setFormData] = useState({
    capacidad: "",
    ubicacion: "",
    estado: "",
  })

  useEffect(() => {
    if (table) {
      setFormData({
        capacidad: table.capacidad.toString(),
        ubicacion: table.ubicacion,
        estado: table.estado,
      })
    }
  }, [table])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedTable = {
      numero: table?.numero,
      capacidad: Number.parseInt(formData.capacidad),
      ubicacion: formData.ubicacion,
      estado: formData.estado,
    }

    if (onSubmit) {
      onSubmit(updatedTable)
    }
    onOpenChange(false)
  }

  if (!table) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Editar Mesa {table.numero}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad *</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="capacidad"
                type="number"
                min="1"
                max="20"
                value={formData.capacidad}
                onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación *</Label>
            <Select value={formData.ubicacion} onValueChange={(value) => setFormData({ ...formData, ubicacion: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terraza">Terraza</SelectItem>
                <SelectItem value="interior">Interior</SelectItem>
                <SelectItem value="salon_privado">Salón Privado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado *</Label>
            <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="ocupada">Ocupada</SelectItem>
                <SelectItem value="reservada">Reservada</SelectItem>
                <SelectItem value="mantenimiento">En Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

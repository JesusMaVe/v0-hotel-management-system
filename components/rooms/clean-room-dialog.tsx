"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface CleanRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomNumber: string
  onClean: (data: CleaningData) => void
}

export interface CleaningData {
  type: string
  assignedTo: string
  priority: string
  notes?: string
}

export function CleanRoomDialog({ open, onOpenChange, roomNumber, onClean }: CleanRoomDialogProps) {
  const [type, setType] = useState("standard-cleaning")
  const [assignedTo, setAssignedTo] = useState("")
  const [priority, setPriority] = useState("medium")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (!assignedTo) {
      alert("Por favor asigna un responsable")
      return
    }

    onClean({
      type,
      assignedTo,
      priority,
      notes,
    })

    // Reset form
    setType("standard-cleaning")
    setAssignedTo("")
    setPriority("medium")
    setNotes("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Programar Limpieza - Habitación {roomNumber}</span>
          </DialogTitle>
          <DialogDescription>Asigna una tarea de limpieza para esta habitación</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clean-type">
              Tipo de Limpieza <span className="text-error">*</span>
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard-cleaning">Limpieza Estándar</SelectItem>
                <SelectItem value="checkout-cleaning">Limpieza Post Check-out</SelectItem>
                <SelectItem value="deep-cleaning">Limpieza Profunda</SelectItem>
                <SelectItem value="maintenance-cleaning">Limpieza Post Mantenimiento</SelectItem>
                <SelectItem value="inspection">Inspección</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assigned-to">
              Asignar a <span className="text-error">*</span>
            </Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar personal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maria-lopez">María López</SelectItem>
                <SelectItem value="carlos-sanchez">Carlos Sánchez</SelectItem>
                <SelectItem value="ana-rodriguez">Ana Rodríguez</SelectItem>
                <SelectItem value="luis-garcia">Luis García</SelectItem>
                <SelectItem value="sofia-martinez">Sofía Martínez</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Prioridad</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baja</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Instrucciones especiales o detalles importantes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Programar Limpieza</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

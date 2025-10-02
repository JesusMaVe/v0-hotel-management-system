"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"

interface MaintenanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomNumber: string
  onMaintenance: (data: MaintenanceData) => void
}

export interface MaintenanceData {
  issue: string
  priority: string
  description: string
}

export function MaintenanceDialog({ open, onOpenChange, roomNumber, onMaintenance }: MaintenanceDialogProps) {
  const [issue, setIssue] = useState("")
  const [priority, setPriority] = useState("medium")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!issue || !description) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    onMaintenance({
      issue,
      priority,
      description,
    })

    // Reset form
    setIssue("")
    setPriority("medium")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Reportar Mantenimiento - Habitación {roomNumber}</span>
          </DialogTitle>
          <DialogDescription>Reporta un problema o solicita mantenimiento para esta habitación</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="issue">
              Tipo de Problema <span className="text-error">*</span>
            </Label>
            <Select value={issue} onValueChange={setIssue}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar problema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ac">Aire Acondicionado</SelectItem>
                <SelectItem value="plumbing">Plomería</SelectItem>
                <SelectItem value="electrical">Eléctrico</SelectItem>
                <SelectItem value="furniture">Muebles</SelectItem>
                <SelectItem value="tv">Televisión</SelectItem>
                <SelectItem value="wifi">Internet/WiFi</SelectItem>
                <SelectItem value="bathroom">Baño</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
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
                <SelectItem value="low">Baja - Puede esperar</SelectItem>
                <SelectItem value="medium">Media - Atender pronto</SelectItem>
                <SelectItem value="high">Alta - Atender hoy</SelectItem>
                <SelectItem value="urgent">Urgente - Inmediato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Descripción del Problema <span className="text-error">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe el problema en detalle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="destructive">
            Reportar Problema
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface BookServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: any
}

export function BookServiceDialog({ open, onOpenChange, service }: BookServiceDialogProps) {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    habitacion: "",
    huespedes: "",
    hora: "",
    notas: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Reserva confirmada",
      description: `${service.nombre} reservado para ${format(date || new Date(), "PPP", { locale: es })} a las ${formData.hora}`,
    })
    onOpenChange(false)
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
            <Label>Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
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

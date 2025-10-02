"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface AssignRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomNumber: string
  onAssign: (data: AssignmentData) => void
}

export interface AssignmentData {
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: Date
  checkOut: Date
  guests: number
  specialRequests?: string
}

export function AssignRoomDialog({ open, onOpenChange, roomNumber, onAssign }: AssignRoomDialogProps) {
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [specialRequests, setSpecialRequests] = useState("")

  const handleSubmit = () => {
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    onAssign({
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests: Number.parseInt(guests),
      specialRequests,
    })

    // Reset form
    setGuestName("")
    setGuestEmail("")
    setGuestPhone("")
    setCheckIn(undefined)
    setCheckOut(undefined)
    setGuests("2")
    setSpecialRequests("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Asignar Habitación {roomNumber}</span>
          </DialogTitle>
          <DialogDescription>Ingresa los datos del huésped para asignar la habitación</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name">
                Nombre del Huésped <span className="text-error">*</span>
              </Label>
              <Input
                id="guest-name"
                placeholder="Juan Pérez"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest-email">
                Email <span className="text-error">*</span>
              </Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="juan@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest-phone">Teléfono</Label>
              <Input
                id="guest-phone"
                type="tel"
                placeholder="+52 123 456 7890"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">
                Número de Huéspedes <span className="text-error">*</span>
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Huésped</SelectItem>
                  <SelectItem value="2">2 Huéspedes</SelectItem>
                  <SelectItem value="3">3 Huéspedes</SelectItem>
                  <SelectItem value="4">4 Huéspedes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Check-in <span className="text-error">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>
                Check-out <span className="text-error">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests">Solicitudes Especiales</Label>
            <Input
              id="special-requests"
              placeholder="Ej: Cama extra, vista al mar, piso alto..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Asignar Habitación</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

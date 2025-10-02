"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Calendar, Users, Bed } from "lucide-react"

interface BulkCheckInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservations: any[]
  onCheckIn: (ids: string[]) => void
}

export function BulkCheckInDialog({ open, onOpenChange, reservations, onCheckIn }: BulkCheckInDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Filter reservations eligible for check-in (confirmed status and check-in date is today or past)
  const eligibleReservations = reservations.filter((res) => {
    const today = new Date().toISOString().split("T")[0]
    return res.status === "confirmed" && res.checkIn <= today
  })

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedIds.length === eligibleReservations.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(eligibleReservations.map((res) => res.id))
    }
  }

  const handleSubmit = () => {
    if (selectedIds.length > 0) {
      onCheckIn(selectedIds)
      setSelectedIds([])
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Check-in Masivo
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Selecciona las reservaciones para realizar check-in simultáneo
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Summary */}
          <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{eligibleReservations.length}</p>
                <p className="text-xs text-muted-foreground">Disponibles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{selectedIds.length}</p>
                <p className="text-xs text-muted-foreground">Seleccionadas</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedIds.length === eligibleReservations.length ? "Deseleccionar Todo" : "Seleccionar Todo"}
            </Button>
          </div>

          {/* Reservations List */}
          {eligibleReservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay reservaciones elegibles para check-in</p>
              <p className="text-sm text-muted-foreground mt-2">
                Solo se muestran reservaciones confirmadas con fecha de entrada hoy o anterior
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {eligibleReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIds.includes(reservation.id)
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-border hover:border-blue-500/50"
                  }`}
                  onClick={() => handleToggle(reservation.id)}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedIds.includes(reservation.id)}
                      onCheckedChange={() => handleToggle(reservation.id)}
                      className="mt-1"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{reservation.guestName}</h4>
                          <p className="text-sm text-muted-foreground">{reservation.email}</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {reservation.id}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.checkIn}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.roomType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.guests} huéspedes</span>
                        </div>
                        {reservation.roomNumber && (
                          <div className="font-semibold text-foreground">Hab. {reservation.roomNumber}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={selectedIds.length === 0}>
              Realizar Check-in ({selectedIds.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

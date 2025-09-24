"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Users, Bed, DollarSign } from "lucide-react"

interface BulkCheckOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservations: any[]
  onCheckOut: (ids: string[]) => void
}

export function BulkCheckOutDialog({ open, onOpenChange, reservations, onCheckOut }: BulkCheckOutDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Filter reservations eligible for check-out (checked-in status)
  const eligibleReservations = reservations.filter((res) => res.status === "checked-in")

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
      onCheckOut(selectedIds)
      setSelectedIds([])
      onOpenChange(false)
    }
  }

  const totalAmount = eligibleReservations
    .filter((res) => selectedIds.includes(res.id))
    .reduce((sum, res) => sum + res.totalAmount, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Check-out Masivo
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Selecciona las reservaciones para realizar check-out simultáneo
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-400">{eligibleReservations.length}</p>
              <p className="text-xs text-muted-foreground">Disponibles</p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-400">{selectedIds.length}</p>
              <p className="text-xs text-muted-foreground">Seleccionadas</p>
            </div>
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-center">
              <p className="text-xl font-bold text-cyan-400">${totalAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total a Cobrar</p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleSelectAll} className="w-full bg-transparent">
            {selectedIds.length === eligibleReservations.length ? "Deseleccionar Todo" : "Seleccionar Todo"}
          </Button>

          {/* Reservations List */}
          {eligibleReservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay reservaciones elegibles para check-out</p>
              <p className="text-sm text-muted-foreground mt-2">
                Solo se muestran reservaciones con estado "checked-in"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {eligibleReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIds.includes(reservation.id)
                      ? "border-green-500 bg-green-500/10"
                      : "border-border hover:border-green-500/50"
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
                        <div className="text-right">
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 mb-1">
                            {reservation.id}
                          </Badge>
                          <p className="text-sm font-semibold text-foreground">
                            ${reservation.totalAmount.toLocaleString()} MXN
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.checkOut}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Hab. {reservation.roomNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.guests} huéspedes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{reservation.roomType}</span>
                        </div>
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
              Realizar Check-out ({selectedIds.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

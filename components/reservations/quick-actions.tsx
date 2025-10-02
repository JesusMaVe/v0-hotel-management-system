"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, UserPlus, Calendar, Clock } from "lucide-react"

interface QuickActionsProps {
  onNewReservation: () => void
  onBulkCheckIn: () => void
  onBulkCheckOut: () => void
  onViewCalendar: () => void
}

export function QuickActions({ onNewReservation, onBulkCheckIn, onBulkCheckOut, onViewCalendar }: QuickActionsProps) {
  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button onClick={onNewReservation} className="flex items-center space-x-2 h-12">
          <Plus className="h-5 w-5" />
          <span>Nueva Reserva</span>
        </Button>

        <Button variant="outline" onClick={onBulkCheckIn} className="flex items-center space-x-2 h-12 bg-transparent">
          <UserPlus className="h-5 w-5" />
          <span>Check-in Masivo</span>
        </Button>

        <Button variant="outline" onClick={onBulkCheckOut} className="flex items-center space-x-2 h-12 bg-transparent">
          <Clock className="h-5 w-5" />
          <span>Check-out Masivo</span>
        </Button>

        <Button variant="outline" onClick={onViewCalendar} className="flex items-center space-x-2 h-12 bg-transparent">
          <Calendar className="h-5 w-5" />
          <span>Ver Calendario</span>
        </Button>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Llegadas Hoy</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">8</p>
          <p className="text-sm text-muted-foreground">Salidas Hoy</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-sm text-muted-foreground">Huéspedes Activos</p>
        </div>
      </div>
    </Card>
  )
}

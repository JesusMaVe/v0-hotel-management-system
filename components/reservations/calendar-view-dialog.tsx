"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface CalendarViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservations: any[]
}

export function CalendarViewDialog({ open, onOpenChange, reservations }: CalendarViewDialogProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const getReservationsForDate = (date: string) => {
    return reservations.filter((res) => {
      return date >= res.checkIn && date <= res.checkOut
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500/20 border-blue-500/50 text-blue-400"
      case "checked-in":
        return "bg-green-500/20 border-green-500/50 text-green-400"
      case "pending":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
      case "checked-out":
        return "bg-gray-500/20 border-gray-500/50 text-gray-400"
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-400"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            Calendario de Reservaciones
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h3>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/50" />
              <span>Confirmada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/50" />
              <span>Check-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/50" />
              <span>Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-500/20 border border-gray-500/50" />
              <span>Check-out</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border border-border rounded-lg overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-muted/50">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-semibold border-r border-border last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dateStr = day
                  ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  : ""
                const dayReservations = day ? getReservationsForDate(dateStr) : []
                const isToday =
                  day &&
                  new Date().getDate() === day &&
                  new Date().getMonth() === month &&
                  new Date().getFullYear() === year

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border-r border-b border-border last:border-r-0 ${
                      !day ? "bg-muted/20" : ""
                    } ${isToday ? "bg-blue-500/5" : ""}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-1 ${isToday ? "text-blue-400" : ""}`}>{day}</div>
                        <div className="space-y-1">
                          {dayReservations.slice(0, 3).map((res) => (
                            <div
                              key={res.id}
                              className={`text-xs p-1 rounded border truncate ${getStatusColor(res.status)}`}
                              title={`${res.guestName} - ${res.roomType}`}
                            >
                              {res.guestName.split(" ")[0]}
                            </div>
                          ))}
                          {dayReservations.length > 3 && (
                            <div className="text-xs text-muted-foreground">+{dayReservations.length - 3} más</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {reservations.filter((r) => r.status === "confirmed").length}
              </p>
              <p className="text-sm text-muted-foreground">Confirmadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {reservations.filter((r) => r.status === "checked-in").length}
              </p>
              <p className="text-sm text-muted-foreground">Check-in</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {reservations.filter((r) => r.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-400">
                {reservations.filter((r) => r.status === "checked-out").length}
              </p>
              <p className="text-sm text-muted-foreground">Check-out</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

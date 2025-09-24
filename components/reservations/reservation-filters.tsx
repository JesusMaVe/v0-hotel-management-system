"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Search, X } from "lucide-react"

interface ReservationFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function ReservationFilters({ onFiltersChange }: ReservationFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [roomType, setRoomType] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  const handleFilterChange = () => {
    onFiltersChange({
      searchTerm,
      status: status === "all" ? null : status,
      roomType: roomType === "all" ? null : roomType,
      dateRange: dateRange === "all" ? null : dateRange,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatus("all")
    setRoomType("all")
    setDateRange("today")
    onFiltersChange({})
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros de Búsqueda</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="confirmed">Confirmada</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="checked-in">Check-in</SelectItem>
            <SelectItem value="checked-out">Check-out</SelectItem>
            <SelectItem value="cancelled">Cancelada</SelectItem>
          </SelectContent>
        </Select>

        {/* Room Type Filter */}
        <Select value={roomType} onValueChange={setRoomType}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de habitación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
            <SelectItem value="ejecutiva">Ejecutiva</SelectItem>
            <SelectItem value="presidencial">Presidencial</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger>
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="tomorrow">Mañana</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mes</SelectItem>
            <SelectItem value="all">Todas las fechas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button onClick={handleFilterChange} className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Aplicar Filtros</span>
        </Button>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Última actualización: hace 2 minutos</span>
        </div>
      </div>
    </div>
  )
}

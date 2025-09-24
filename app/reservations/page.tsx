"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { ReservationCard } from "@/components/reservations/reservation-card"
import { ReservationFilters } from "@/components/reservations/reservation-filters"
import { QuickActions } from "@/components/reservations/quick-actions"

// Mock data
const mockReservations = [
  {
    id: "RES-001",
    guestName: "Ana María González Herrera",
    email: "ana.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    checkIn: "2025-09-23",
    checkOut: "2025-09-26",
    roomType: "Suite Ejecutiva",
    roomNumber: "101",
    status: "confirmed" as const,
    totalAmount: 8500,
    guests: 2,
    specialRequests: "Vista al jardín, late check-out, dieta vegetariana",
  },
  {
    id: "RES-002",
    guestName: "Carlos Rodríguez Martín",
    email: "carlos.rodriguez@email.com",
    phone: "+52 55 9876 5432",
    checkIn: "2025-09-23",
    checkOut: "2025-09-25",
    roomType: "Standard",
    roomNumber: "205",
    status: "checked-in" as const,
    totalAmount: 4200,
    guests: 1,
  },
  {
    id: "RES-003",
    guestName: "María José López Silva",
    email: "maria.lopez@email.com",
    phone: "+52 55 5555 1234",
    checkIn: "2025-09-24",
    checkOut: "2025-09-27",
    roomType: "Suite",
    status: "pending" as const,
    totalAmount: 6300,
    guests: 3,
    specialRequests: "Cuna para bebé, habitación en planta baja",
  },
  {
    id: "RES-004",
    guestName: "Roberto Fernández Castro",
    email: "roberto.fernandez@email.com",
    phone: "+52 55 7777 8888",
    checkIn: "2025-09-22",
    checkOut: "2025-09-23",
    roomType: "Ejecutiva",
    roomNumber: "312",
    status: "checked-out" as const,
    totalAmount: 5600,
    guests: 2,
  },
  {
    id: "RES-005",
    guestName: "Laura Sánchez Morales",
    email: "laura.sanchez@email.com",
    phone: "+52 55 3333 4444",
    checkIn: "2025-09-25",
    checkOut: "2025-09-28",
    roomType: "Presidencial",
    status: "confirmed" as const,
    totalAmount: 12000,
    guests: 4,
    specialRequests: "Decoración especial para aniversario, champagne de bienvenida",
  },
]

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(mockReservations)
  const [filteredReservations, setFilteredReservations] = useState(mockReservations)

  const handleFiltersChange = (filters: any) => {
    let filtered = reservations

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (res) =>
          res.guestName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          res.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          res.id.toLowerCase().includes(filters.searchTerm.toLowerCase()),
      )
    }

    if (filters.status) {
      filtered = filtered.filter((res) => res.status === filters.status)
    }

    if (filters.roomType) {
      filtered = filtered.filter((res) => res.roomType.toLowerCase().includes(filters.roomType.toLowerCase()))
    }

    setFilteredReservations(filtered)
  }

  const handleCheckIn = (id: string) => {
    setReservations((prev) => prev.map((res) => (res.id === id ? { ...res, status: "checked-in" as const } : res)))
    setFilteredReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: "checked-in" as const } : res)),
    )
  }

  const handleCheckOut = (id: string) => {
    setReservations((prev) => prev.map((res) => (res.id === id ? { ...res, status: "checked-out" as const } : res)))
    setFilteredReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: "checked-out" as const } : res)),
    )
  }

  const handleNewReservation = () => {
    // TODO: Open new reservation modal
    console.log("Nueva reserva")
  }

  const handleBulkCheckIn = () => {
    // TODO: Open bulk check-in modal
    console.log("Check-in masivo")
  }

  const handleBulkCheckOut = () => {
    // TODO: Open bulk check-out modal
    console.log("Check-out masivo")
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Gestión de Reservaciones"
        subtitle="Administra reservas, check-ins y check-outs de Villa Magna Family Resorts"
      />

      <div className="flex-1 p-6 space-y-6">
        <QuickActions
          onNewReservation={handleNewReservation}
          onBulkCheckIn={handleBulkCheckIn}
          onBulkCheckOut={handleBulkCheckOut}
        />

        <ReservationFilters onFiltersChange={handleFiltersChange} />

        {/* Reservations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Reservaciones ({filteredReservations.length})</h3>
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredReservations.length} de {reservations.length} reservaciones
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onEdit={(id) => console.log("Editar reserva:", id)}
              />
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron reservaciones con los filtros aplicados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

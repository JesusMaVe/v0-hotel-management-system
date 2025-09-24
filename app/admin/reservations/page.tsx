"use client";

<<<<<<< HEAD:app/reservations/page.tsx
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { ReservationCard } from "@/components/reservations/reservation-card"
import { ReservationFilters } from "@/components/reservations/reservation-filters"
import { QuickActions } from "@/components/reservations/quick-actions"
import { NewReservationDialog } from "@/components/reservations/new-reservation-dialog"
import { BulkCheckInDialog } from "@/components/reservations/bulk-checkin-dialog"
import { BulkCheckOutDialog } from "@/components/reservations/bulk-checkout-dialog"
import { CalendarViewDialog } from "@/components/reservations/calendar-view-dialog"
import { EditReservationDialog } from "@/components/reservations/edit-reservation-dialog"
import { useToast } from "@/hooks/use-toast"

const mockReservations = [
=======
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ReservationCard } from "@/components/admin/reservations/reservation-card";
import { ReservationFilters } from "@/components/admin/reservations/reservation-filters";
import { QuickActions } from "@/components/admin/reservations/quick-actions";

type ReservationStatus = "checked-in" | "checked-out" | "confirmed" | "pending";

type Reservation = {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  roomNumber?: string;
  status: ReservationStatus;
  totalAmount: number;
  guests: number;
  specialRequests?: string;
};

// Mock data
const mockReservations: Reservation[] = [
>>>>>>> be72ef3 (añadiendo los gráficos estadísticos):app/admin/reservations/page.tsx
  {
    id: "RES-001",
    guestName: "Ana María González Herrera",
    email: "ana.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    checkIn: "2025-02-10",
    checkOut: "2025-02-13",
    roomType: "Suite Ejecutiva",
    roomNumber: "101",
    status: "confirmed",
    totalAmount: 8500,
    guests: 2,
    specialRequests: "Vista al jardín, late check-out, dieta vegetariana",
  },
  {
    id: "RES-002",
    guestName: "Carlos Rodríguez Martín",
    email: "carlos.rodriguez@email.com",
    phone: "+52 55 9876 5432",
    checkIn: "2025-02-10",
    checkOut: "2025-02-12",
    roomType: "Standard",
    roomNumber: "205",
    status: "checked-in",
    totalAmount: 4200,
    guests: 1,
  },
  {
    id: "RES-003",
    guestName: "María José López Silva",
    email: "maria.lopez@email.com",
    phone: "+52 55 5555 1234",
    checkIn: "2025-02-11",
    checkOut: "2025-02-14",
    roomType: "Suite",
    status: "pending",
    totalAmount: 6300,
    guests: 3,
    specialRequests: "Cuna para bebé, habitación en planta baja",
  },
  {
    id: "RES-004",
    guestName: "Roberto Fernández Castro",
    email: "roberto.fernandez@email.com",
    phone: "+52 55 7777 8888",
    checkIn: "2025-02-09",
    checkOut: "2025-02-10",
    roomType: "Ejecutiva",
    roomNumber: "312",
    status: "checked-out",
    totalAmount: 5600,
    guests: 2,
  },
  {
    id: "RES-005",
    guestName: "Laura Sánchez Morales",
    email: "laura.sanchez@email.com",
    phone: "+52 55 3333 4444",
    checkIn: "2025-02-12",
    checkOut: "2025-02-15",
    roomType: "Presidencial",
    status: "confirmed",
    totalAmount: 12000,
    guests: 4,
    specialRequests:
      "Decoración especial para aniversario, champagne de bienvenida",
  },
<<<<<<< HEAD:app/reservations/page.tsx
  {
    id: "RES-006",
    guestName: "Pedro Ramírez Torres",
    email: "pedro.ramirez@email.com",
    phone: "+52 55 2222 3333",
    checkIn: "2025-02-10",
    checkOut: "2025-02-11",
    roomType: "Standard",
    roomNumber: "108",
    status: "confirmed" as const,
    totalAmount: 1400,
    guests: 1,
  },
  {
    id: "RES-007",
    guestName: "Isabel Martínez Ruiz",
    email: "isabel.martinez@email.com",
    phone: "+52 55 4444 5555",
    checkIn: "2025-02-13",
    checkOut: "2025-02-16",
    roomType: "Suite",
    status: "confirmed" as const,
    totalAmount: 12600,
    guests: 2,
    specialRequests: "Luna de miel, decoración romántica",
  },
  {
    id: "RES-008",
    guestName: "Jorge Luis Hernández",
    email: "jorge.hernandez@email.com",
    phone: "+52 55 6666 7777",
    checkIn: "2025-02-08",
    checkOut: "2025-02-10",
    roomType: "Ejecutiva",
    roomNumber: "215",
    status: "checked-in" as const,
    totalAmount: 5600,
    guests: 1,
  },
]
=======
];
>>>>>>> be72ef3 (añadiendo los gráficos estadísticos):app/admin/reservations/page.tsx

export default function ReservationsPage() {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [filteredReservations, setFilteredReservations] =
    useState<Reservation[]>(mockReservations);

  const [newReservationOpen, setNewReservationOpen] = useState(false)
  const [bulkCheckInOpen, setBulkCheckInOpen] = useState(false)
  const [bulkCheckOutOpen, setBulkCheckOutOpen] = useState(false)
  const [calendarViewOpen, setCalendarViewOpen] = useState(false)
  const [editReservationOpen, setEditReservationOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const { toast } = useToast()

  const handleFiltersChange = (filters: any) => {
    let filtered = reservations;

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (res) =>
          res.guestName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          res.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          res.id.toLowerCase().includes(filters.searchTerm.toLowerCase()),
      );
    }

    if (filters.status) {
      filtered = filtered.filter((res) => res.status === filters.status);
    }

    if (filters.roomType) {
      filtered = filtered.filter((res) =>
        res.roomType.toLowerCase().includes(filters.roomType.toLowerCase()),
      );
    }

    setFilteredReservations(filtered);
  };

  const handleCheckIn = (id: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "checked-in" as const } : res,
      ),
    );
    setFilteredReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "checked-in" as const } : res,
      ),
    );
  };

  const handleCheckOut = (id: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "checked-out" as const } : res,
      ),
    );
    setFilteredReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "checked-out" as const } : res,
      ),
    );
  };

<<<<<<< HEAD:app/reservations/page.tsx
  const handleNewReservation = (newReservation: any) => {
    setReservations((prev) => [newReservation, ...prev])
    setFilteredReservations((prev) => [newReservation, ...prev])
  }

  const handleBulkCheckIn = (ids: string[]) => {
    setReservations((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, status: "checked-in" as const } : res)),
    )
    setFilteredReservations((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, status: "checked-in" as const } : res)),
    )
  }

  const handleBulkCheckOut = (ids: string[]) => {
    setReservations((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, status: "checked-out" as const } : res)),
    )
    setFilteredReservations((prev) =>
      prev.map((res) => (ids.includes(res.id) ? { ...res, status: "checked-out" as const } : res)),
    )
  }

  const handleEdit = (id: string) => {
    const reservation = reservations.find((r) => r.id === id)
    if (reservation) {
      setSelectedReservation(reservation)
      setEditReservationOpen(true)
    }
  }

  const handleUpdateReservation = (id: string, updatedData: any) => {
    setReservations((prev) => prev.map((res) => (res.id === id ? { ...res, ...updatedData } : res)))
    setFilteredReservations((prev) => prev.map((res) => (res.id === id ? { ...res, ...updatedData } : res)))
  }
=======
  const handleNewReservation = () => {
    // TODO: Open new reservation modal
    console.log("Nueva reserva");
  };

  const handleBulkCheckIn = () => {
    // TODO: Open bulk check-in modal
    console.log("Check-in masivo");
  };

  const handleBulkCheckOut = () => {
    // TODO: Open bulk check-out modal
    console.log("Check-out masivo");
  };
>>>>>>> be72ef3 (añadiendo los gráficos estadísticos):app/admin/reservations/page.tsx

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Gestión de Reservaciones"
        subtitle="Administra reservas, check-ins y check-outs de Villa Magna Family Resorts"
      />

      <div className="flex-1 p-6 space-y-6">
        <QuickActions
          onNewReservation={() => setNewReservationOpen(true)}
          onBulkCheckIn={() => setBulkCheckInOpen(true)}
          onBulkCheckOut={() => setBulkCheckOutOpen(true)}
          onViewCalendar={() => setCalendarViewOpen(true)}
        />

        <ReservationFilters onFiltersChange={handleFiltersChange} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Reservaciones ({filteredReservations.length})
            </h3>
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredReservations.length} de {reservations.length}{" "}
              reservaciones
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onEdit={handleEdit}
              />
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron reservaciones con los filtros aplicados
              </p>
            </div>
          )}
        </div>
      </div>

      <NewReservationDialog
        open={newReservationOpen}
        onOpenChange={setNewReservationOpen}
        onSubmit={handleNewReservation}
      />

      <BulkCheckInDialog
        open={bulkCheckInOpen}
        onOpenChange={setBulkCheckInOpen}
        reservations={reservations}
        onCheckIn={handleBulkCheckIn}
      />

      <BulkCheckOutDialog
        open={bulkCheckOutOpen}
        onOpenChange={setBulkCheckOutOpen}
        reservations={reservations}
        onCheckOut={handleBulkCheckOut}
      />

      <CalendarViewDialog open={calendarViewOpen} onOpenChange={setCalendarViewOpen} reservations={reservations} />

      <EditReservationDialog
        open={editReservationOpen}
        onOpenChange={setEditReservationOpen}
        reservation={selectedReservation}
        onUpdate={handleUpdateReservation}
      />
    </div>
  );
}

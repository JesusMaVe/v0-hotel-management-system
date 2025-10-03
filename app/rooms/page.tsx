"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { RoomCard } from "@/components/rooms/room-card"
import { HousekeepingPanel } from "@/components/rooms/housekeeping-panel"
import { AssignRoomDialog, type AssignmentData } from "@/components/rooms/assign-room-dialog"
import { CleanRoomDialog, type CleaningData } from "@/components/rooms/clean-room-dialog"
import { MaintenanceDialog, type MaintenanceData } from "@/components/rooms/maintenance-dialog"
import { RoomDetailsDialog } from "@/components/rooms/room-details-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockRooms = [
  {
    id: "room-101",
    number: "101",
    floor: 1,
    type: "suite" as const,
    status: "occupied" as const,
    guest: "Ana María González",
    checkOut: "2025-09-26",
    capacity: 2,
    amenities: ["wifi", "minibar", "tv", "ac", "jacuzzi"],
    price: 3200,
    lastCleaned: "2025-09-22 14:30",
    position: { x: 20, y: 30 },
  },
  {
    id: "room-102",
    number: "102",
    floor: 1,
    type: "standard" as const,
    status: "available" as const,
    capacity: 2,
    amenities: ["wifi", "tv", "ac"],
    price: 1800,
    lastCleaned: "2025-09-23 09:15",
    position: { x: 40, y: 30 },
  },
  {
    id: "room-103",
    number: "103",
    floor: 1,
    type: "ejecutiva" as const,
    status: "cleaning" as const,
    capacity: 3,
    amenities: ["wifi", "minibar", "tv", "ac", "parking"],
    price: 2800,
    lastCleaned: "2025-09-23 11:00",
    position: { x: 60, y: 30 },
  },
  {
    id: "room-104",
    number: "104",
    floor: 1,
    type: "standard" as const,
    status: "maintenance" as const,
    capacity: 2,
    amenities: ["wifi", "tv", "ac"],
    price: 1800,
    maintenanceNotes: "A/C no funciona correctamente, técnico programado para mañana",
    position: { x: 80, y: 30 },
  },
  {
    id: "room-201",
    number: "201",
    floor: 2,
    type: "presidencial" as const,
    status: "occupied" as const,
    guest: "Carlos Rodríguez",
    checkOut: "2025-09-25",
    capacity: 4,
    amenities: ["wifi", "minibar", "tv", "ac", "jacuzzi", "parking"],
    price: 5500,
    lastCleaned: "2025-09-22 16:00",
    position: { x: 30, y: 40 },
  },
  {
    id: "room-202",
    number: "202",
    floor: 2,
    type: "suite" as const,
    status: "available" as const,
    capacity: 3,
    amenities: ["wifi", "minibar", "tv", "ac"],
    price: 3200,
    lastCleaned: "2025-09-23 10:30",
    position: { x: 60, y: 40 },
  },
]

const mockHousekeepingTasks = [
  {
    id: "task-1",
    roomNumber: "103",
    type: "checkout-cleaning" as const,
    assignedTo: "María López",
    priority: "high" as const,
    estimatedTime: 45,
    status: "in-progress" as const,
    startTime: "10:30",
    notes: "Huésped dejó habitación muy desordenada",
  },
  {
    id: "task-2",
    roomNumber: "205",
    type: "maintenance-cleaning" as const,
    assignedTo: "Carlos Sánchez",
    priority: "urgent" as const,
    estimatedTime: 60,
    status: "pending" as const,
    notes: "Después de reparación de plomería",
  },
  {
    id: "task-3",
    roomNumber: "301",
    type: "deep-cleaning" as const,
    assignedTo: "Ana Rodríguez",
    priority: "medium" as const,
    estimatedTime: 90,
    status: "pending" as const,
  },
  {
    id: "task-4",
    roomNumber: "102",
    type: "inspection" as const,
    assignedTo: "Luis García",
    priority: "low" as const,
    estimatedTime: 15,
    status: "completed" as const,
  },
]

export default function RoomsPage() {
  const [housekeepingTasks, setHousekeepingTasks] = useState(mockHousekeepingTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [cleanDialogOpen, setCleanDialogOpen] = useState(false)
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null)
  const [rooms, setRooms] = useState(mockRooms)
  const { toast } = useToast()

  const handleTaskUpdate = (taskId: string, status: string) => {
    const task = housekeepingTasks.find((t) => t.id === taskId)
    setHousekeepingTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: status as any } : task)))
    const statusText = status === "completed" ? "completada" : status === "in-progress" ? "en progreso" : "pendiente"
    toast({
      title: `Tarea ${statusText}`,
      description: `Habitación ${task?.roomNumber} - ${task?.type}`,
    })
  }

  const handleAssignRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setSelectedRoom(room.number)
      setAssignDialogOpen(true)
    }
  }

  const handleCleanRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setSelectedRoom(room.number)
      setCleanDialogOpen(true)
    }
  }

  const handleMaintenanceRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setSelectedRoom(room.number)
      setMaintenanceDialogOpen(true)
    }
  }

  const handleViewDetails = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setSelectedRoomData(room)
      setDetailsDialogOpen(true)
    }
  }

  const onAssignSubmit = (data: AssignmentData) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.number === selectedRoom
          ? {
              ...room,
              status: "occupied" as const,
              guest: data.guestName,
              checkOut: data.checkOut.toISOString().split("T")[0],
            }
          : room,
      ),
    )
    toast({
      title: "Habitación Asignada",
      description: `Habitación ${selectedRoom} asignada a ${data.guestName}`,
    })
  }

  const onCleanSubmit = (data: CleaningData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      roomNumber: selectedRoom,
      type: data.type as any,
      assignedTo: data.assignedTo,
      priority: data.priority as any,
      estimatedTime: 45,
      status: "pending" as const,
      notes: data.notes,
    }
    setHousekeepingTasks((prev) => [...prev, newTask])
    setRooms((prev) =>
      prev.map((room) => (room.number === selectedRoom ? { ...room, status: "cleaning" as const } : room)),
    )
    toast({
      title: "Limpieza Programada",
      description: `Tarea de limpieza creada para habitación ${selectedRoom}`,
    })
  }

  const onMaintenanceSubmit = (data: MaintenanceData) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.number === selectedRoom
          ? {
              ...room,
              status: "maintenance" as const,
              maintenanceNotes: data.description,
            }
          : room,
      ),
    )
    toast({
      title: "Mantenimiento Reportado",
      description: `Problema reportado para habitación ${selectedRoom}`,
      variant: "destructive",
    })
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col h-full">
      <Header title="Gestión de Habitaciones" subtitle="Control de habitaciones, asignaciones y housekeeping" />

      <div className="flex-1 p-6">
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Habitaciones</TabsTrigger>
            <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número de habitación o huésped..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Todas
                </Button>
                <Button
                  variant={statusFilter === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("available")}
                >
                  Disponibles
                </Button>
                <Button
                  variant={statusFilter === "occupied" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("occupied")}
                >
                  Ocupadas
                </Button>
                <Button
                  variant={statusFilter === "cleaning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("cleaning")}
                >
                  Limpieza
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onAssign={handleAssignRoom}
                  onClean={handleCleanRoom}
                  onMaintenance={handleMaintenanceRoom}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="housekeeping" className="space-y-6">
            <HousekeepingPanel tasks={housekeepingTasks} onTaskUpdate={handleTaskUpdate} />
          </TabsContent>
        </Tabs>
      </div>

      <AssignRoomDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        roomNumber={selectedRoom}
        onAssign={onAssignSubmit}
      />
      <CleanRoomDialog
        open={cleanDialogOpen}
        onOpenChange={setCleanDialogOpen}
        roomNumber={selectedRoom}
        onClean={onCleanSubmit}
      />
      <MaintenanceDialog
        open={maintenanceDialogOpen}
        onOpenChange={setMaintenanceDialogOpen}
        roomNumber={selectedRoom}
        onMaintenance={onMaintenanceSubmit}
      />
      <RoomDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} room={selectedRoomData} />
    </div>
  )
}

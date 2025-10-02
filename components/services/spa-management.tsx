"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, DollarSign, User, MapPin, Calendar, Plus, Search, Filter } from "lucide-react"
import { NewServiceDialog } from "./new-service-dialog"
import { BookServiceDialog } from "./book-service-dialog"
import { EditServiceDialog } from "./edit-service-dialog"

const spaServices = [
  {
    id: 1,
    nombre: "Masaje Relajante",
    duracion: 60,
    precio: 1200,
    terapeuta: "María López",
    sala: "Sala Zen 1",
    disponibilidad: ["10:00", "14:00", "16:00"],
  },
  {
    id: 2,
    nombre: "Facial Hidratante",
    duracion: 45,
    precio: 950,
    terapeuta: "Ana Ruiz",
    sala: "Sala Belleza",
    disponibilidad: ["11:00", "15:30"],
  },
  {
    id: 3,
    nombre: "Masaje de Piedras Calientes",
    duracion: 90,
    precio: 1800,
    terapeuta: "Carlos Mendoza",
    sala: "Sala Zen 2",
    disponibilidad: ["09:00", "13:00"],
  },
  {
    id: 4,
    nombre: "Tratamiento Corporal",
    duracion: 75,
    precio: 1500,
    terapeuta: "Laura García",
    sala: "Sala Wellness",
    disponibilidad: ["12:00", "17:00"],
  },
]

export function SpaManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false)
  const [showBookDialog, setShowBookDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const filteredServices = spaServices.filter(
    (service) =>
      service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.terapeuta.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBook = (service: any) => {
    setSelectedService(service)
    setShowBookDialog(true)
  }

  const handleEdit = (service: any) => {
    setSelectedService(service)
    setShowEditDialog(true)
  }

  return (
    <div className="space-y-6 px-2.5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestión de Spa</h2>
          <p className="text-muted-foreground">Administra servicios, terapeutas y citas del spa</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowNewServiceDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios o terapeutas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{service.nombre}</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  ${service.precio}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{service.duracion} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${service.precio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{service.terapeuta}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{service.sala}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Disponibilidad Hoy</Label>
                <div className="flex flex-wrap gap-2">
                  {service.disponibilidad.map((hora, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {hora}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1" onClick={() => handleBook(service)}>
                  <Calendar className="h-4 w-4 mr-1" />
                  Reservar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(service)}
                >
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewServiceDialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog} serviceType="spa" />
      <BookServiceDialog open={showBookDialog} onOpenChange={setShowBookDialog} service={selectedService} />
      <EditServiceDialog open={showEditDialog} onOpenChange={setShowEditDialog} service={selectedService} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Clock, Sparkles, Utensils, Calendar, ConciergeBell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CatalogServiceRequestDialog } from "./catalog-service-request-dialog"

interface ServiceCatalogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const allServices = {
  spa: [
    { id: 1, nombre: "Masaje Relajante", duracion: 60, precio: 1200, categoria: "Masajes" },
    { id: 2, nombre: "Facial Hidratante", duracion: 45, precio: 950, categoria: "Faciales" },
    { id: 3, nombre: "Masaje de Piedras Calientes", duracion: 90, precio: 1800, categoria: "Masajes" },
    { id: 4, nombre: "Tratamiento Corporal", duracion: 75, precio: 1500, categoria: "Tratamientos" },
    { id: 5, nombre: "Manicure & Pedicure", duracion: 60, precio: 800, categoria: "Belleza" },
  ],
  restaurant: [
    { id: 1, nombre: "Desayuno Buffet", precio: 350, categoria: "Desayuno" },
    { id: 2, nombre: "Menú del Día", precio: 420, categoria: "Comida" },
    { id: 3, nombre: "Cena Romántica", precio: 1200, categoria: "Cena" },
    { id: 4, nombre: "Servicio a Habitación", precio: 0, categoria: "Room Service" },
  ],
  events: [
    { id: 1, nombre: "Salón Magna", capacidad: 150, precio: 2500, categoria: "Corporativo" },
    { id: 2, nombre: "Salón Imperial", capacidad: 80, precio: 1800, categoria: "Social" },
    { id: 3, nombre: "Terraza de Eventos", capacidad: 200, precio: 3000, categoria: "Bodas" },
  ],
  concierge: [
    { id: 1, nombre: "Transporte al Aeropuerto", precio: 450, categoria: "Transporte" },
    { id: 2, nombre: "Tour por la Ciudad", precio: 800, categoria: "Tours" },
    { id: 3, nombre: "Reserva de Restaurantes", precio: 0, categoria: "Reservaciones" },
    { id: 4, nombre: "Servicio de Lavandería", precio: 200, categoria: "Asistencia" },
  ],
}

export function ServiceCatalogDialog({ open, onOpenChange }: ServiceCatalogDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")

  const getIcon = (type: string) => {
    switch (type) {
      case "spa":
        return <Sparkles className="h-5 w-5" />
      case "restaurant":
        return <Utensils className="h-5 w-5" />
      case "events":
        return <Calendar className="h-5 w-5" />
      case "concierge":
        return <ConciergeBell className="h-5 w-5" />
      default:
        return null
    }
  }

  const filterServices = (services: any[]) => {
    return services.filter(
      (service) =>
        service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const renderServiceCard = (service: any, type: string) => (
    <Card key={`${type}-${service.id}`} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getIcon(type)}
            <h4 className="font-semibold">{service.nombre}</h4>
          </div>
          <Badge variant="secondary">${service.precio}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {service.duracion && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{service.duracion} min</span>
            </div>
          )}
          {service.capacidad && (
            <div className="flex items-center gap-1">
              <span>Cap: {service.capacidad}</span>
            </div>
          )}
          <Badge variant="outline" className="text-xs">
            {service.categoria}
          </Badge>
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={() => {
            setSelectedService(service)
            setSelectedServiceType(type)
            setShowRequestDialog(true)
          }}
        >
          Solicitar
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Catálogo de Servicios</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="spa">Spa</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurante</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="concierge">Concierge</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Spa & Wellness
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filterServices(allServices.spa).map((service) => renderServiceCard(service, "spa"))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Restaurante
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filterServices(allServices.restaurant).map((service) => renderServiceCard(service, "restaurant"))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Eventos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filterServices(allServices.events).map((service) => renderServiceCard(service, "events"))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <ConciergeBell className="h-4 w-4" />
                  Concierge
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filterServices(allServices.concierge).map((service) => renderServiceCard(service, "concierge"))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spa" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filterServices(allServices.spa).map((service) => renderServiceCard(service, "spa"))}
              </div>
            </TabsContent>

            <TabsContent value="restaurant" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filterServices(allServices.restaurant).map((service) => renderServiceCard(service, "restaurant"))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filterServices(allServices.events).map((service) => renderServiceCard(service, "events"))}
              </div>
            </TabsContent>

            <TabsContent value="concierge" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filterServices(allServices.concierge).map((service) => renderServiceCard(service, "concierge"))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <CatalogServiceRequestDialog
          open={showRequestDialog}
          onOpenChange={setShowRequestDialog}
          service={selectedService}
          serviceType={selectedServiceType}
        />
      </DialogContent>
    </Dialog>
  )
}

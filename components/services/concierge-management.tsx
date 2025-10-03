"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Car,
  Utensils,
  Waves,
  Printer,
  Fan as Fax,
  Monitor,
  Users,
  Clock,
  DollarSign,
  Plus,
  Search,
  Phone,
  Mail,
} from "lucide-react"
import { NewConciergeRequestDialog } from "./new-concierge-request-dialog"

const conciergeData = {
  serviciosVarios: {
    concierge: [
      "Tours a zonas arqueológicas",
      "Renta de autos",
      "Reservas en restaurantes externos",
      "Actividades acuáticas",
    ],
    businessCenter: {
      servicios: ["Impresiones", "Fax", "Computadoras", "Sala de juntas"],
      horarios: "24/7",
      tarifas: {
        impresionBN: 5,
        impresionColor: 15,
        salaJuntas: 500,
      },
    },
  },
}

const solicitudesRecientes = [
  {
    id: 1,
    huesped: "María González",
    habitacion: "205",
    servicio: "Tour arqueológico",
    estado: "pendiente",
    fecha: "2025-09-25",
    hora: "10:30",
    notas: "Interesada en Chichen Itzá, 4 personas",
  },
  {
    id: 2,
    huesped: "Carlos Ruiz",
    habitacion: "312",
    servicio: "Renta de auto",
    estado: "confirmado",
    fecha: "2025-09-25",
    hora: "14:00",
    notas: "SUV para 7 personas, 3 días",
  },
  {
    id: 3,
    huesped: "Ana López",
    habitacion: "108",
    servicio: "Reserva restaurante",
    estado: "completado",
    fecha: "2025-09-24",
    hora: "19:00",
    notas: "La Parrilla, mesa para 6 personas",
  },
]

export function ConciergeManagement() {
  const [activeTab, setActiveTab] = useState("solicitudes")
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false)

  const getServiceIcon = (servicio: string) => {
    if (servicio.includes("Tour") || servicio.includes("arqueológico")) return <MapPin className="h-4 w-4" />
    if (servicio.includes("auto") || servicio.includes("Renta")) return <Car className="h-4 w-4" />
    if (servicio.includes("restaurante") || servicio.includes("Reserva")) return <Utensils className="h-4 w-4" />
    if (servicio.includes("acuáticas") || servicio.includes("Actividades")) return <Waves className="h-4 w-4" />
    return <Phone className="h-4 w-4" />
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "confirmado":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completado":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getBusinessIcon = (servicio: string) => {
    switch (servicio) {
      case "Impresiones":
        return <Printer className="h-4 w-4" />
      case "Fax":
        return <Fax className="h-4 w-4" />
      case "Computadoras":
        return <Monitor className="h-4 w-4" />
      case "Sala de juntas":
        return <Users className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 px-2.5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestión de Concierge</h2>
          <p className="text-muted-foreground">Administra servicios de concierge y business center</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowNewRequestDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Solicitud
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 border-b">
        <Button
          variant={activeTab === "solicitudes" ? "default" : "ghost"}
          onClick={() => setActiveTab("solicitudes")}
          className="rounded-b-none"
        >
          Solicitudes de Concierge
        </Button>
        <Button
          variant={activeTab === "business" ? "default" : "ghost"}
          onClick={() => setActiveTab("business")}
          className="rounded-b-none"
        >
          Business Center
        </Button>
        <Button
          variant={activeTab === "servicios" ? "default" : "ghost"}
          onClick={() => setActiveTab("servicios")}
          className="rounded-b-none"
        >
          Catálogo de Servicios
        </Button>
      </div>

      {activeTab === "solicitudes" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por huésped o servicio..." className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {solicitudesRecientes.map((solicitud) => (
              <Card key={solicitud.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{solicitud.huesped}</CardTitle>
                      <p className="text-sm text-muted-foreground">Habitación {solicitud.habitacion}</p>
                    </div>
                    <Badge className={getStatusColor(solicitud.estado)}>{solicitud.estado}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getServiceIcon(solicitud.servicio)}
                    <span className="font-medium">{solicitud.servicio}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {solicitud.fecha} {solicitud.hora}
                      </span>
                    </div>
                  </div>

                  {solicitud.notas && (
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Notas</Label>
                      <p className="text-sm text-muted-foreground">{solicitud.notas}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Contactar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "business" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Servicios Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {conciergeData.serviciosVarios.businessCenter.servicios.map((servicio, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getBusinessIcon(servicio)}
                    <span className="font-medium">{servicio}</span>
                  </div>
                  <Badge variant="outline">Disponible</Badge>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Horarios: {conciergeData.serviciosVarios.businessCenter.horarios}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Tarifas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Printer className="h-4 w-4 text-muted-foreground" />
                    <span>Impresión B/N</span>
                  </div>
                  <span className="font-medium">
                    ${conciergeData.serviciosVarios.businessCenter.tarifas.impresionBN}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Printer className="h-4 w-4 text-muted-foreground" />
                    <span>Impresión Color</span>
                  </div>
                  <span className="font-medium">
                    ${conciergeData.serviciosVarios.businessCenter.tarifas.impresionColor}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Sala de Juntas (por hora)</span>
                  </div>
                  <span className="font-medium">
                    ${conciergeData.serviciosVarios.businessCenter.tarifas.salaJuntas}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "servicios" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conciergeData.serviciosVarios.concierge.map((servicio, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{getServiceIcon(servicio)}</div>
                <h3 className="font-medium text-sm">{servicio}</h3>
                <Button size="sm" className="mt-4 w-full">
                  Solicitar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <NewConciergeRequestDialog
        open={showNewRequestDialog}
        onOpenChange={setShowNewRequestDialog}
        onSubmit={(request) => {
          console.log("Nueva solicitud:", request)
          // Aquí se podría agregar la lógica para guardar la solicitud
        }}
      />
    </div>
  )
}

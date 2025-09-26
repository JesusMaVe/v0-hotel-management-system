"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Utensils, Calendar, ConciergeBell as Concierge, TrendingUp, BookOpen } from "lucide-react"
import { SpaManagement } from "@/components/services/spa-management"
import { RestaurantManagement } from "@/components/services/restaurant-management"
import { EventsManagement } from "@/components/services/events-management"
import { ConciergeManagement } from "@/components/services/concierge-management"
import { ServiceCatalogDialog } from "@/components/services/service-catalog-dialog"

const serviceStats = [
  {
    title: "Servicios de Spa",
    value: "24",
    change: "+12%",
    icon: Sparkles,
    description: "Servicios activos hoy",
  },
  {
    title: "Reservas Restaurante",
    value: "18",
    change: "+8%",
    icon: Utensils,
    description: "Mesas reservadas",
  },
  {
    title: "Eventos Programados",
    value: "3",
    change: "+2",
    icon: Calendar,
    description: "Esta semana",
  },
  {
    title: "Solicitudes Concierge",
    value: "12",
    change: "+5",
    icon: Concierge,
    description: "Pendientes",
  },
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("overview")
  const [showCatalogDialog, setShowCatalogDialog] = useState(false)

  const renderServiceContent = () => {
    switch (activeService) {
      case "spa":
        return <SpaManagement />
      case "restaurant":
        return <RestaurantManagement />
      case "events":
        return <EventsManagement />
      case "concierge":
        return <ConciergeManagement />
      default:
        return (
          <div className="space-y-8 px-2.5">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-normal mx-0 px-2.5 py-0">
                  Gestión de Servicios
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl px-2.5">
                  Administra todos los servicios adicionales del hotel de manera integral
                </p>
              </div>
              <div className="px-2.5">
                <Button onClick={() => setShowCatalogDialog(true)} variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Catálogo Completo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {serviceStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1 min-w-0">
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">{stat.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                          <Badge variant="secondary" className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
                      </div>
                      <div className="p-2 md:p-3 bg-accent/10 rounded-lg flex-shrink-0 ml-3">
                        <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-accent group"
                onClick={() => setActiveService("spa")}
              >
                <CardHeader className="text-center pb-3 space-y-3">
                  <div className="mx-auto p-3 md:p-4 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                    <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg md:text-xl leading-tight">Spa & Wellness</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Gestiona servicios de spa, terapeutas y citas
                  </p>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Servicios activos:</span>
                      <span className="font-medium text-foreground">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Terapeutas:</span>
                      <span className="font-medium text-foreground">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Citas hoy:</span>
                      <span className="font-medium text-foreground">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-accent group"
                onClick={() => setActiveService("restaurant")}
              >
                <CardHeader className="text-center pb-3 space-y-3">
                  <div className="mx-auto p-3 md:p-4 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                    <Utensils className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg md:text-xl leading-tight">Restaurante</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Administra mesas, reservas y menú del día
                  </p>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mesas totales:</span>
                      <span className="font-medium text-foreground">25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Reservas hoy:</span>
                      <span className="font-medium text-foreground">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Ocupación:</span>
                      <span className="font-medium text-foreground">72%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-accent group"
                onClick={() => setActiveService("events")}
              >
                <CardHeader className="text-center pb-3 space-y-3">
                  <div className="mx-auto p-3 md:p-4 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                    <Calendar className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg md:text-xl leading-tight">Eventos</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Gestiona salones y eventos corporativos
                  </p>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Salones:</span>
                      <span className="font-medium text-foreground">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Eventos esta semana:</span>
                      <span className="font-medium text-foreground">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Capacidad total:</span>
                      <span className="font-medium text-foreground">430</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-accent group"
                onClick={() => setActiveService("concierge")}
              >
                <CardHeader className="text-center pb-3 space-y-3">
                  <div className="mx-auto p-3 md:p-4 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                    <Concierge className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg md:text-xl leading-tight">Concierge</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Servicios de concierge y business center
                  </p>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Solicitudes pendientes:</span>
                      <span className="font-medium text-foreground">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Servicios disponibles:</span>
                      <span className="font-medium text-foreground">15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Satisfacción:</span>
                      <span className="font-medium text-foreground">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                  Resumen de Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-green-500/10 rounded-lg flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="font-medium text-sm md:text-base leading-tight">Masaje relajante completado</p>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Habitación 205 - María González
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs self-start sm:self-center">
                      Hace 15 min
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                        <Utensils className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="font-medium text-sm md:text-base leading-tight">Nueva reserva de mesa</p>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Mesa 12 - 20:00 - 4 personas
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs self-start sm:self-center">
                      Hace 32 min
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                        <Calendar className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="font-medium text-sm md:text-base leading-tight">Evento confirmado</p>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Salón Magna - Conferencia empresarial
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs self-start sm:self-center">
                      Hace 1 hora
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-wrap gap-2 border-b pb-4 overflow-x-auto pt-2.5 pl-2.5">
        <Button
          variant={activeService === "overview" ? "default" : "ghost"}
          onClick={() => setActiveService("overview")}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Resumen General</span>
          <span className="sm:hidden">Resumen</span>
        </Button>
        <Button
          variant={activeService === "spa" ? "default" : "ghost"}
          onClick={() => setActiveService("spa")}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Sparkles className="h-4 w-4" />
          Spa
        </Button>
        <Button
          variant={activeService === "restaurant" ? "default" : "ghost"}
          onClick={() => setActiveService("restaurant")}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Utensils className="h-4 w-4" />
          Restaurante
        </Button>
        <Button
          variant={activeService === "events" ? "default" : "ghost"}
          onClick={() => setActiveService("events")}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Calendar className="h-4 w-4" />
          Eventos
        </Button>
        <Button
          variant={activeService === "concierge" ? "default" : "ghost"}
          onClick={() => setActiveService("concierge")}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Concierge className="h-4 w-4" />
          Concierge
        </Button>
      </div>

      {renderServiceContent()}

      <ServiceCatalogDialog open={showCatalogDialog} onOpenChange={setShowCatalogDialog} />
    </div>
  )
}
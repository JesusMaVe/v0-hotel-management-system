"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Users, MapPin, Clock, ChefHat, Plus, Calendar, DollarSign } from "lucide-react"
import { EditMenuDialog } from "./edit-menu-dialog"

const restaurantData = {
  mesas: [
    {
      numero: 15,
      capacidad: 4,
      ubicacion: "terraza",
      estado: "disponible",
      reservas: [
        {
          hora: "20:00",
          huespedes: 2,
          nombreReserva: "García Family",
        },
      ],
    },
    {
      numero: 8,
      capacidad: 6,
      ubicacion: "interior",
      estado: "ocupada",
      reservas: [
        {
          hora: "19:30",
          huespedes: 4,
          nombreReserva: "Rodríguez",
        },
      ],
    },
    {
      numero: 12,
      capacidad: 2,
      ubicacion: "terraza",
      estado: "reservada",
      reservas: [
        {
          hora: "21:00",
          huespedes: 2,
          nombreReserva: "López",
        },
      ],
    },
    {
      numero: 5,
      capacidad: 8,
      ubicacion: "salon_privado",
      estado: "disponible",
      reservas: [],
    },
  ],
  menuDelDia: {
    entradas: ["Sopa de tortilla", "Ensalada César"],
    principales: ["Pescado a la veracruzana", "Pollo en mole"],
    postres: ["Flan napolitano", "Helado de vainilla"],
    precioMenu: 420,
  },
}

export function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false)

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "ocupada":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "reservada":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getLocationLabel = (ubicacion: string) => {
    switch (ubicacion) {
      case "terraza":
        return "Terraza"
      case "interior":
        return "Interior"
      case "salon_privado":
        return "Salón Privado"
      default:
        return ubicacion
    }
  }

  return (
    <div className="space-y-6 px-2.5">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestión de Restaurante</h2>
          <p className="text-muted-foreground">Administra mesas, reservas y menú del día</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Estado de Mesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurantData.mesas.map((mesa) => (
                  <Card key={mesa.numero} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">Mesa {mesa.numero}</h3>
                        <Badge className={getStatusColor(mesa.estado)}>{mesa.estado}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Capacidad: {mesa.capacidad} personas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{getLocationLabel(mesa.ubicacion)}</span>
                        </div>
                      </div>

                      {mesa.reservas.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <Label className="text-xs font-medium text-muted-foreground">PRÓXIMA RESERVA</Label>
                          <div className="mt-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{mesa.reservas[0].hora}</span>
                            </div>
                            <div className="text-sm font-medium">{mesa.reservas[0].nombreReserva}</div>
                            <div className="text-xs text-muted-foreground">{mesa.reservas[0].huespedes} huéspedes</div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Calendar className="h-4 w-4 mr-1" />
                          Reservar
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Menú del Día
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">${restaurantData.menuDelDia.precioMenu}</span>
                </div>
                <p className="text-sm text-muted-foreground">Precio por persona</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="font-medium text-sm">Entradas</Label>
                  <ul className="mt-1 space-y-1">
                    {restaurantData.menuDelDia.entradas.map((entrada, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {entrada}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="font-medium text-sm">Platos Principales</Label>
                  <ul className="mt-1 space-y-1">
                    {restaurantData.menuDelDia.principales.map((principal, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {principal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="font-medium text-sm">Postres</Label>
                  <ul className="mt-1 space-y-1">
                    {restaurantData.menuDelDia.postres.map((postre, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {postre}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowEditMenuDialog(true)}>
                Editar Menú
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditMenuDialog
        open={showEditMenuDialog}
        onOpenChange={setShowEditMenuDialog}
        menuData={restaurantData.menuDelDia}
      />
    </div>
  )
}

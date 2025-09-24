"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Hotel, Users, Bell, Shield, Database, Save } from "lucide-react"

export default function SettingsPage() {
  const [hotelName, setHotelName] = useState("Villa Magna Family Resorts")
  const [currency, setCurrency] = useState("MXN")
  const [timezone, setTimezone] = useState("America/Mexico_City")
  const [language, setLanguage] = useState("es")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reservations: true,
    maintenance: true,
    revenue: true,
  })

  const saveSettings = () => {
    console.log("Guardando configuración...")
    // TODO: Implement actual save functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground">Gestiona la configuración del sistema y preferencias del hotel</p>
        </div>
        <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Configuración General</span>
              </CardTitle>
              <CardDescription>Configuración básica del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hotel-name">Nombre del Hotel</Label>
                  <Input id="hotel-name" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                      <SelectItem value="America/Cancun">Cancún</SelectItem>
                      <SelectItem value="America/Los_Angeles">Los Ángeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hotel Settings */}
        <TabsContent value="hotel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hotel className="h-5 w-5" />
                <span>Configuración del Hotel</span>
              </CardTitle>
              <CardDescription>Información y configuración específica del hotel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="total-rooms">Total de Habitaciones</Label>
                  <Input id="total-rooms" type="number" defaultValue="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-in">Hora de Check-in</Label>
                  <Input id="check-in" type="time" defaultValue="15:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out">Hora de Check-out</Label>
                  <Input id="check-out" type="time" defaultValue="12:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tasa de Impuestos (%)</Label>
                  <Input id="tax-rate" type="number" step="0.01" defaultValue="16.00" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Tipos de Habitación</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: "Estándar", count: 60, price: 2500 },
                    { type: "Superior", count: 40, price: 3200 },
                    { type: "Suite", count: 20, price: 4800 },
                  ].map((room, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-foreground">{room.type}</h5>
                          <Badge variant="outline">{room.count} hab.</Badge>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Precio Base</Label>
                          <Input type="number" defaultValue={room.price} className="h-8" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Gestión de Usuarios</span>
              </CardTitle>
              <CardDescription>Administra usuarios y permisos del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Usuarios Activos</h4>
                  <Button size="sm">Agregar Usuario</Button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Ana García", role: "Administrador", email: "ana@villamagna.com", status: "Activo" },
                    { name: "Carlos López", role: "Recepcionista", email: "carlos@villamagna.com", status: "Activo" },
                    {
                      name: "María Rodríguez",
                      role: "Housekeeping",
                      email: "maria@villamagna.com",
                      status: "Inactivo",
                    },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Configuración de Notificaciones</span>
              </CardTitle>
              <CardDescription>Gestiona cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Canales de Notificación</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Push</p>
                      <p className="text-sm text-muted-foreground">Notificaciones push en el navegador</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">SMS</p>
                      <p className="text-sm text-muted-foreground">Mensajes de texto para alertas críticas</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Tipos de Notificación</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Reservaciones</p>
                      <p className="text-sm text-muted-foreground">Nuevas reservas, cancelaciones y modificaciones</p>
                    </div>
                    <Switch
                      checked={notifications.reservations}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reservations: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Mantenimiento</p>
                      <p className="text-sm text-muted-foreground">Reportes de mantenimiento y limpieza</p>
                    </div>
                    <Switch
                      checked={notifications.maintenance}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, maintenance: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Ingresos</p>
                      <p className="text-sm text-muted-foreground">Alertas de ingresos y métricas financieras</p>
                    </div>
                    <Switch
                      checked={notifications.revenue}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, revenue: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Configuración de Seguridad</span>
              </CardTitle>
              <CardDescription>Configuración de seguridad y acceso al sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Autenticación de Dos Factores</p>
                    <p className="text-sm text-muted-foreground">Requiere verificación adicional para iniciar sesión</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Sesiones Múltiples</p>
                    <p className="text-sm text-muted-foreground">Permitir múltiples sesiones activas por usuario</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Bloqueo Automático</p>
                    <p className="text-sm text-muted-foreground">Bloquear sesión después de inactividad</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Políticas de Contraseña</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Longitud Mínima</Label>
                    <Input type="number" defaultValue="8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Días para Expiración</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Integraciones</span>
              </CardTitle>
              <CardDescription>Configuración de integraciones externas y APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { name: "Sistema de Pagos", status: "Conectado", description: "Stripe, PayPal" },
                  { name: "Email Marketing", status: "Desconectado", description: "Mailchimp, SendGrid" },
                  { name: "Análisis Web", status: "Conectado", description: "Google Analytics" },
                  { name: "Redes Sociales", status: "Conectado", description: "Facebook, Instagram" },
                  { name: "Sistema POS", status: "Desconectado", description: "Restaurante y Bar" },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={integration.status === "Conectado" ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.status === "Conectado" ? "Configurar" : "Conectar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

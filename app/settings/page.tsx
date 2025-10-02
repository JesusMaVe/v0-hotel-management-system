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
import { Settings, Hotel, Users, Bell, Shield, Database, Save, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const { toast } = useToast()

  const [hotelName, setHotelName] = useState("Villa Magna Family Resorts")
  const [currency, setCurrency] = useState("MXN")
  const [timezone, setTimezone] = useState("America/Mexico_City")
  const [language, setLanguage] = useState("es")
  const [totalRooms, setTotalRooms] = useState("120")
  const [checkInTime, setCheckInTime] = useState("15:00")
  const [checkOutTime, setCheckOutTime] = useState("12:00")
  const [taxRate, setTaxRate] = useState("16.00")

  const [roomTypes, setRoomTypes] = useState([
    { type: "Estándar", count: 60, price: 2500 },
    { type: "Superior", count: 40, price: 3200 },
    { type: "Suite", count: 20, price: 4800 },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: "Ana García", role: "Administrador", email: "ana@villamagna.com", status: "Activo" },
    { id: 2, name: "Carlos López", role: "Recepcionista", email: "carlos@villamagna.com", status: "Activo" },
    { id: 3, name: "María Rodríguez", role: "Housekeeping", email: "maria@villamagna.com", status: "Inactivo" },
  ])

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reservations: true,
    maintenance: true,
    revenue: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    multipleSessions: true,
    autoLock: true,
    minPasswordLength: "8",
    passwordExpiry: "90",
  })

  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Sistema de Pagos", status: "Conectado", description: "Stripe, PayPal" },
    { id: 2, name: "Email Marketing", status: "Desconectado", description: "Mailchimp, SendGrid" },
    { id: 3, name: "Análisis Web", status: "Conectado", description: "Google Analytics" },
    { id: 4, name: "Redes Sociales", status: "Conectado", description: "Facebook, Instagram" },
    { id: 5, name: "Sistema POS", status: "Desconectado", description: "Restaurante y Bar" },
  ])

  const [newUserDialog, setNewUserDialog] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("")

  const saveSettings = () => {
    toast({
      title: "Configuración Guardada",
      description: "Todos los cambios han sido guardados exitosamente",
    })
  }

  const updateRoomTypePrice = (index: number, newPrice: string) => {
    setRoomTypes((prev) =>
      prev.map((room, i) => (i === index ? { ...room, price: Number.parseInt(newPrice) || 0 } : room)),
    )
  }

  const addNewUser = () => {
    if (!newUserName || !newUserEmail || !newUserRole) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Activo",
    }

    setUsers((prev) => [...prev, newUser])
    setNewUserName("")
    setNewUserEmail("")
    setNewUserRole("")
    setNewUserDialog(false)

    toast({
      title: "Usuario Agregado",
      description: `${newUserName} ha sido agregado exitosamente`,
    })
  }

  const deleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    toast({
      title: "Usuario Eliminado",
      description: "El usuario ha sido eliminado del sistema",
    })
  }

  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Activo" ? "Inactivo" : "Activo" } : user,
      ),
    )
  }

  const toggleIntegration = (integrationId: number) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              status: integration.status === "Conectado" ? "Desconectado" : "Conectado",
            }
          : integration,
      ),
    )
    toast({
      title: "Integración Actualizada",
      description: "El estado de la integración ha sido actualizado",
    })
  }

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Configuración</h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Gestiona la configuración del sistema y preferencias del hotel
          </p>
        </div>
        <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90 w-full md:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 min-w-max md:min-w-0">
            <TabsTrigger value="general" className="text-xs md:text-sm px-2 md:px-4">
              General
            </TabsTrigger>
            <TabsTrigger value="hotel" className="text-xs md:text-sm px-2 md:px-4">
              Hotel
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm px-2 md:px-4">
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm px-2 md:px-4">
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs md:text-sm px-2 md:px-4">
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="integrations" className="text-xs md:text-sm px-2 md:px-4">
              Integraciones
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Settings className="h-5 w-5 md:h-6 md:w-6" />
                <span>Configuración General</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">Configuración básica del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="hotel-name" className="text-sm font-medium">
                    Nombre del Hotel
                  </Label>
                  <Input
                    id="hotel-name"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="currency" className="text-sm font-medium">
                    Moneda
                  </Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="timezone" className="text-sm font-medium">
                    Zona Horaria
                  </Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                      <SelectItem value="America/Cancun">Cancún</SelectItem>
                      <SelectItem value="America/Los_Angeles">Los Ángeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="language" className="text-sm font-medium">
                    Idioma
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-10">
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
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Hotel className="h-5 w-5 md:h-6 md:w-6" />
                <span>Configuración del Hotel</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Información y configuración específica del hotel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="total-rooms" className="text-sm font-medium">
                    Total de Habitaciones
                  </Label>
                  <Input
                    id="total-rooms"
                    type="number"
                    value={totalRooms}
                    onChange={(e) => setTotalRooms(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="check-in" className="text-sm font-medium">
                    Hora de Check-in
                  </Label>
                  <Input
                    id="check-in"
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="check-out" className="text-sm font-medium">
                    Hora de Check-out
                  </Label>
                  <Input
                    id="check-out"
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tax-rate" className="text-sm font-medium">
                    Tasa de Impuestos (%)
                  </Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-base">Tipos de Habitación</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roomTypes.map((room, index) => (
                    <Card key={index} className="p-5">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-foreground text-sm">{room.type}</h5>
                          <Badge variant="outline" className="text-xs">
                            {room.count} hab.
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground">Precio Base</Label>
                          <Input
                            type="number"
                            value={room.price}
                            onChange={(e) => updateRoomTypePrice(index, e.target.value)}
                            className="h-9 text-sm"
                          />
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
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Users className="h-5 w-5 md:h-6 md:w-6" />
                <span>Gestión de Usuarios</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Administra usuarios y permisos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <h4 className="font-semibold text-foreground text-base">Usuarios Activos</h4>
                <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                      <DialogDescription>Ingresa los datos del nuevo usuario del sistema</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-user-name">Nombre Completo</Label>
                        <Input
                          id="new-user-name"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="Juan Pérez"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-user-email">Email</Label>
                        <Input
                          id="new-user-email"
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="juan@villamagna.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-user-role">Rol</Label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                            <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setNewUserDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={addNewUser}>Agregar Usuario</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 p-4 border border-border rounded-lg"
                  >
                    <div className="space-y-2">
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-3">
                      <Badge variant={user.status === "Activo" ? "default" : "secondary"} className="text-xs">
                        {user.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => toggleUserStatus(user.id)}>
                        {user.status === "Activo" ? "Desactivar" : "Activar"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-error"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Bell className="h-5 w-5 md:h-6 md:w-6" />
                <span>Configuración de Notificaciones</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Gestiona cómo y cuándo recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-base">Canales de Notificación</h4>
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Recibir notificaciones por correo electrónico
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">Push</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Notificaciones push en el navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">SMS</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Mensajes de texto para alertas críticas
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-base">Tipos de Notificación</h4>
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">Reservaciones</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Nuevas reservas, cancelaciones y modificaciones
                      </p>
                    </div>
                    <Switch
                      checked={notifications.reservations}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reservations: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">Mantenimiento</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Reportes de mantenimiento y limpieza
                      </p>
                    </div>
                    <Switch
                      checked={notifications.maintenance}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, maintenance: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1 flex-1 pr-4">
                      <p className="font-medium text-foreground text-sm">Ingresos</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Alertas de ingresos y métricas financieras
                      </p>
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
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Shield className="h-5 w-5 md:h-6 md:w-6" />
                <span>Configuración de Seguridad</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Configuración de seguridad y acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-foreground text-sm">Autenticación de Dos Factores</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Requiere verificación adicional para iniciar sesión
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, twoFactor: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-foreground text-sm">Sesiones Múltiples</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Permitir múltiples sesiones activas por usuario
                    </p>
                  </div>
                  <Switch
                    checked={security.multipleSessions}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, multipleSessions: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-foreground text-sm">Bloqueo Automático</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Bloquear sesión después de inactividad
                    </p>
                  </div>
                  <Switch
                    checked={security.autoLock}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, autoLock: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-base">Políticas de Contraseña</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Longitud Mínima</Label>
                    <Input
                      type="number"
                      value={security.minPasswordLength}
                      onChange={(e) => setSecurity((prev) => ({ ...prev, minPasswordLength: e.target.value }))}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Días para Expiración</Label>
                    <Input
                      type="number"
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity((prev) => ({ ...prev, passwordExpiry: e.target.value }))}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center space-x-3 text-lg md:text-xl">
                <Database className="h-5 w-5 md:h-6 md:w-6" />
                <span>Integraciones</span>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Configuración de integraciones externas y APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 p-5 border border-border rounded-lg"
                  >
                    <div className="space-y-2">
                      <p className="font-medium text-foreground text-sm">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-3">
                      <Badge variant={integration.status === "Conectado" ? "default" : "secondary"} className="text-xs">
                        {integration.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-transparent"
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        {integration.status === "Conectado" ? "Desconectar" : "Conectar"}
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ArrowRight, Calendar, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function BookingForm() {
  const [searchByPoints, setSearchByPoints] = useState(false);
  const [onlineBookable, setOnlineBookable] = useState(false);
  const [adaAccessible, setAdaAccessible] = useState(false);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [seniorsCount, setSeniorsCount] = useState(0);
  const [roomType, setRoomType] = useState("");

  const handleRoomType = (value: string) => {
    setRoomType(value)
  }

  return (
    <div className="min-h-screen bg-hotel-surface">
      <div className="bg-hotel-primary text-hotel-primary-foreground">
        <div className="flex justify-between items-center p-6 pt-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservación</h1>
            <p className="text-hotel-primary-foreground/80 mt-1 italic text-sm">
              "Tu estancia a un par de clics"
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Separator />
        <p className="text-hotel-primary-foreground/80 mt-1 text-sm">
          Seleccione las fechas y el número de personas que se hospedarán en
          Villamagna Family Resorts Aguascalientes
        </p>

        <Card className="bg-hotel-surface-elevated border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-hotel-accent" />
              <Label className="text-sm font-medium text-muted-foreground">
                Fechas
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Entrada
                </Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Salida
                </Label>
                <Input type="date" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-px bg-border flex-1 w-8"></div>
                <ArrowRight className="w-4 h-4" />
                <div className="h-px bg-border flex-1 w-8"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-hotel-surface-elevated border-0 shadow-md">
          <CardContent className="grid px-6 py-2">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-hotel-accent" />
              <Label className="text-sm font-medium text-muted-foreground">
                Tipo de habitación
              </Label>
            </div>

            <div className="grid gap-4 mb-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Elija el tipo de habitación 
                </Label>
                <Select onValueChange={handleRoomType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Eligir..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="superior">Superior</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <GuestCountInput
          label="Adultos"
          guestCount={adultsCount}
          decrementGuestCount={() => setAdultsCount(Math.max(1, adultsCount - 1))}
          incrementGuestCount={() => setAdultsCount(Math.max(1, adultsCount + 1))}
        />
        <GuestCountInput
          label="Niños"
          guestCount={childrenCount}
          decrementGuestCount={() => setChildrenCount(Math.max(1, childrenCount - 1))}
          incrementGuestCount={() => setChildrenCount(Math.max(1, childrenCount + 1))}
        />
        <GuestCountInput
          label="Personas mayores de 60 años"
          guestCount={seniorsCount}
          decrementGuestCount={() => setSeniorsCount(Math.max(1, seniorsCount - 1))}
          incrementGuestCount={() => setSeniorsCount(Math.max(1, seniorsCount + 1))}
        />

        <Card className="bg-hotel-surface-elevated border-0 shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Pagar con Puntos</Label>
                <span className="text-xs text-muted-foreground">
                  Usa tus puntos de lealtad para pagar tu estancia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-xs">
                  20,652 pts
                </Badge>
                <Switch
                  checked={searchByPoints}
                  onCheckedChange={setSearchByPoints}
                />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Habitaciones Accesibles
                </Label>
                <p className="text-xs text-muted-foreground">
                  Solicitar habitaciones para personas con movilidad reducida
                </p>
              </div>
              <Switch
                checked={adaAccessible}
                onCheckedChange={setAdaAccessible}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Solicitar factura</Label>
                <p className="text-xs text-muted-foreground">
                  Nosotros nos encargamos de generarla y de hacerla llegar a tu
                  correo electrónico
                </p>
              </div>
              <Switch
                checked={onlineBookable}
                onCheckedChange={setOnlineBookable}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <ReservationButton
        label="Reservar"
        disabled={false}
      />
    </div>
  );
}

function GuestCountInput({
  label,
  guestCount,
  incrementGuestCount,
  decrementGuestCount
}: {
  label: string
  guestCount: number
  incrementGuestCount: () => void
  decrementGuestCount: () => void
}) {
  return (
    <Card className="bg-hotel-surface-elevated border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-hotel-accent" />
            <Label className="text-lg font-medium">{label}</Label>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementGuestCount}
              className="h-10 w-10 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-xl font-semibold w-8 text-center">
              {guestCount}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementGuestCount}
              className="h-10 w-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReservationButton({
  label,
  disabled
}: {
  label: string
  disabled: boolean
}) {
  return (
    <div className="fixed z-50 bottom-[5.5rem] justify-self-center">
      <Button
        type="button"
        variant="default"
        disabled={disabled}
        className="w-[300px] text-lg px-8 py-4 bg-secondary"
      >
        {label}
        <ArrowRight className="size-6" />
      </Button>
    </div>
  )
}
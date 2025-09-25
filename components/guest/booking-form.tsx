"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ArrowRight, Calendar, Users } from "lucide-react";

export function BookingForm() {
  const [guests, setGuests] = useState(2);
  const [searchByPoints, setSearchByPoints] = useState(false);
  const [onlineBookable, setOnlineBookable] = useState(false);
  const [adaAccessible, setAdaAccessible] = useState(false);

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
                  Check In
                </Label>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-transparent"
                >
                  <span className="text-muted-foreground">Seleccionar</span>
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Check Out
                </Label>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-transparent"
                >
                  <span className="text-muted-foreground">Seleccionar</span>
                </Button>
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-hotel-accent" />
                <Label className="text-lg font-medium">Personas</Label>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="h-10 w-10 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-8 text-center">
                  {guests}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuests(guests + 1)}
                  className="h-10 w-10 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-hotel-surface-elevated border-0 shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Pagar con Puntos</Label>
                <p className="text-xs text-muted-foreground">
                  Usa tus puntos de lealtad para pagar tu estancia
                </p>
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
    </div>
  );
}

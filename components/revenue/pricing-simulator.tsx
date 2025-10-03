"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, TrendingDown, DollarSign, Target, Zap, Calendar as CalendarIcon, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface PricingScenario {
  roomType: string
  currentPrice: number
  suggestedPrice: number
  demandFactor: number
  competitorPrice: number
  occupancyImpact: number
  revenueImpact: number
}

export function PricingSimulator() {
  const { toast } = useToast()
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [scenarios, setScenarios] = useState<PricingScenario[]>([
    {
      roomType: "Standard",
      currentPrice: 1800,
      suggestedPrice: 2100,
      demandFactor: 0.85,
      competitorPrice: 1950,
      occupancyImpact: -5,
      revenueImpact: 12,
    },
    {
      roomType: "Suite",
      currentPrice: 3200,
      suggestedPrice: 3600,
      demandFactor: 0.92,
      competitorPrice: 3400,
      occupancyImpact: -3,
      revenueImpact: 18,
    },
    {
      roomType: "Ejecutiva",
      currentPrice: 2800,
      suggestedPrice: 3100,
      demandFactor: 0.78,
      competitorPrice: 2900,
      occupancyImpact: -8,
      revenueImpact: 8,
    },
  ])

  const [selectedScenario, setSelectedScenario] = useState(0)
  const [customPrice, setCustomPrice] = useState(scenarios[0].currentPrice)

  const calculateImpact = (newPrice: number, scenario: PricingScenario) => {
    const priceChange = ((newPrice - scenario.currentPrice) / scenario.currentPrice) * 100
    const occupancyChange = priceChange * -0.6 // Price elasticity
    const revenueChange = priceChange + occupancyChange * 0.4

    return {
      occupancyImpact: Math.round(occupancyChange),
      revenueImpact: Math.round(revenueChange),
    }
  }

  const currentScenario = scenarios[selectedScenario]
  const customImpact = calculateImpact(customPrice, currentScenario)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Simulador de Precios Dinámicos</h3>
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">IA Predictiva</span>
          </div>
        </div>

        {/* Room Type Selector */}
        <div className="flex space-x-2 mb-6">
          {scenarios.map((scenario, index) => (
            <Button
              key={index}
              variant={selectedScenario === index ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedScenario(index)
                setCustomPrice(scenario.currentPrice)
              }}
            >
              {scenario.roomType}
            </Button>
          ))}
        </div>

        {/* Current vs Suggested */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Precio Actual</p>
            <p className="text-2xl font-bold text-foreground">${currentScenario.currentPrice}</p>
          </div>
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Precio Sugerido IA</p>
            <p className="text-2xl font-bold text-accent">${currentScenario.suggestedPrice}</p>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success">+{currentScenario.revenueImpact}% ingresos</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-sm text-muted-foreground mb-1">Competencia</p>
            <p className="text-2xl font-bold text-warning">${currentScenario.competitorPrice}</p>
          </div>
        </div>

        {/* Custom Price Simulator */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="custom-price">Simular Precio Personalizado</Label>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex-1">
                <Slider
                  value={[customPrice]}
                  onValueChange={(value) => setCustomPrice(value[0])}
                  max={currentScenario.currentPrice * 1.5}
                  min={currentScenario.currentPrice * 0.7}
                  step={50}
                  className="w-full"
                />
              </div>
              <Input
                id="custom-price"
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>

          {/* Impact Prediction */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Impacto en Ocupación</span>
              </div>
              <div className="flex items-center space-x-2">
                {customImpact.occupancyImpact >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-error" />
                )}
                <span className={`font-bold ${customImpact.occupancyImpact >= 0 ? "text-success" : "text-error"}`}>
                  {customImpact.occupancyImpact > 0 ? "+" : ""}
                  {customImpact.occupancyImpact}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Impacto en Ingresos</span>
              </div>
              <div className="flex items-center space-x-2">
                {customImpact.revenueImpact >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-error" />
                )}
                <span className={`font-bold ${customImpact.revenueImpact >= 0 ? "text-success" : "text-error"}`}>
                  {customImpact.revenueImpact > 0 ? "+" : ""}
                  {customImpact.revenueImpact}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Changes */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Cambios se aplicarán automáticamente en 15 minutos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowScheduleDialog(true)}>
              Programar Cambio
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toast({
                  title: "Cambio de precio aplicado",
                  description: `Precio de ${currentScenario.roomType} actualizado a $${customPrice}. El cambio es efectivo inmediatamente.`,
                })
              }}
            >
              Aplicar Ahora
            </Button>
          </div>
        </div>
      </Card>

      {/* Market Analysis */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">Análisis de Mercado</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm text-foreground">Demanda Local</span>
            <Badge className="bg-success/10 text-success border-success/20" variant="outline">
              Alta (85%)
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm text-foreground">Eventos Cercanos</span>
            <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
              Concierto - 2 días
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm text-foreground">Temporada</span>
            <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">
              Alta Temporada
            </Badge>
          </div>
        </div>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Programar Cambio de Precio</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Habitación:</span>
                <span className="font-semibold">{currentScenario.roomType}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Precio Actual:</span>
                <span className="font-semibold">${currentScenario.currentPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Nuevo Precio:</span>
                <span className="font-semibold text-accent">${customPrice}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-date">Fecha de aplicación *</Label>
              <Input
                id="schedule-date"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">Hora de aplicación *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (scheduleDate && scheduleTime) {
                    toast({
                      title: "Cambio programado exitosamente",
                      description: `El precio de ${currentScenario.roomType} cambiará a $${customPrice} el ${scheduleDate} a las ${scheduleTime}`,
                    })
                    setShowScheduleDialog(false)
                    setScheduleDate("")
                    setScheduleTime("")
                  }
                }}
                disabled={!scheduleDate || !scheduleTime}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Programar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

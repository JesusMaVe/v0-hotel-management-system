"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Users, Bed, Star, Calendar, Target } from "lucide-react"

interface ExecutiveMetric {
  title: string
  value: string
  change: number
  target?: number
  icon: React.ReactNode
  trend: "up" | "down" | "stable"
  period: string
}

const executiveMetrics: ExecutiveMetric[] = [
  {
    title: "Ingresos Totales",
    value: "$2,145,600",
    change: 15.2,
    target: 85,
    icon: <DollarSign className="h-6 w-6" />,
    trend: "up",
    period: "vs mes anterior",
  },
  {
    title: "RevPAR",
    value: "$2,456",
    change: 8.7,
    target: 92,
    icon: <TrendingUp className="h-6 w-6" />,
    trend: "up",
    period: "vs mes anterior",
  },
  {
    title: "Ocupación Promedio",
    value: "78.5%",
    change: 5.3,
    target: 78,
    icon: <Bed className="h-6 w-6" />,
    trend: "up",
    period: "vs mes anterior",
  },
  {
    title: "ADR (Tarifa Promedio)",
    value: "$3,128",
    change: 12.1,
    target: 88,
    icon: <Target className="h-6 w-6" />,
    trend: "up",
    period: "vs mes anterior",
  },
  {
    title: "Satisfacción Cliente",
    value: "4.7/5",
    change: 2.8,
    target: 94,
    icon: <Star className="h-6 w-6" />,
    trend: "up",
    period: "vs mes anterior",
  },
  {
    title: "Huéspedes Únicos",
    value: "1,247",
    change: -3.2,
    target: 76,
    icon: <Users className="h-6 w-6" />,
    trend: "down",
    period: "vs mes anterior",
  },
]

export function ExecutiveDashboard() {
  const getTrendColor = (trend: string, change: number) => {
    if (trend === "up" && change > 0) return "text-success"
    if (trend === "down" && change < 0) return "text-error"
    return "text-muted-foreground"
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up" && change > 0) return <TrendingUp className="h-4 w-4 text-success" />
    if (trend === "down" && change < 0) return <TrendingDown className="h-4 w-4 text-error" />
    return null
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Resumen Ejecutivo</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Septiembre 2025</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executiveMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">{metric.icon}</div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend, metric.change)}
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend, metric.change)}`}>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.period}</p>

                {metric.target && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Objetivo</span>
                      <span className="font-medium text-foreground">{metric.target}%</span>
                    </div>
                    <Progress value={metric.target} className="h-1.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Insights Clave del Mes</h4>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Crecimiento Excepcional</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Los ingresos aumentaron 15.2% gracias a la optimización de precios dinámicos y eventos corporativos.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center space-x-2 mb-1">
                <Star className="h-4 w-4 text-accent" />
                <span className="font-medium text-accent">Satisfacción Alta</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La puntuación de satisfacción alcanzó 4.7/5, impulsada por mejoras en el servicio de spa y restaurante.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Área de Oportunidad</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ligera disminución en huéspedes únicos (-3.2%). Implementar estrategias de adquisición.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Objetivos vs Resultados</h4>
          <div className="space-y-4">
            {[
              { metric: "Ingresos Mensuales", target: "$2,000,000", actual: "$2,145,600", achievement: 107 },
              { metric: "Ocupación Promedio", target: "75%", actual: "78.5%", achievement: 105 },
              { metric: "Satisfacción Cliente", target: "4.5", actual: "4.7", achievement: 104 },
              { metric: "RevPAR", target: "$2,300", actual: "$2,456", achievement: 107 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{item.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">{item.target}</span>
                    <span className="text-foreground font-bold">{item.actual}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.min(item.achievement, 100)} className="flex-1 h-2" />
                  <Badge
                    className={
                      item.achievement >= 100
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                    variant="outline"
                  >
                    {item.achievement}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Wifi, Thermometer, Users } from "lucide-react"

interface Metric {
  id: string
  label: string
  value: string
  status: "normal" | "warning" | "critical"
  icon: React.ReactNode
  lastUpdate: string
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "occupancy",
      label: "Ocupación Actual",
      value: "78%",
      status: "normal",
      icon: <Users className="h-4 w-4" />,
      lastUpdate: "Hace 2 min",
    },
    {
      id: "wifi",
      label: "Red WiFi",
      value: "99.2%",
      status: "normal",
      icon: <Wifi className="h-4 w-4" />,
      lastUpdate: "Hace 1 min",
    },
    {
      id: "temperature",
      label: "Temp. Promedio",
      value: "22°C",
      status: "normal",
      icon: <Thermometer className="h-4 w-4" />,
      lastUpdate: "Hace 5 min",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          lastUpdate: "Hace " + Math.floor(Math.random() * 5 + 1) + " min",
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-success/10 text-success border-success/20"
      case "warning":
        return "bg-warning/10 text-warning border-warning/20"
      case "critical":
        return "bg-error/10 text-error border-error/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Métricas en Tiempo Real</h3>
        <Clock className="h-5 w-5 text-accent" />
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-accent/10">{metric.icon}</div>
              <div>
                <p className="font-medium text-foreground">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.lastUpdate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-foreground">{metric.value}</p>
              <Badge className={getStatusColor(metric.status)} variant="outline">
                {metric.status === "normal" ? "Normal" : metric.status === "warning" ? "Alerta" : "Crítico"}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm font-medium text-accent">Sistema Operativo</p>
        <p className="text-xs text-muted-foreground mt-1">Todos los sistemas funcionando correctamente</p>
      </div>
    </Card>
  )
}

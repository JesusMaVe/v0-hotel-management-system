"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Users, MapPin, AlertTriangle } from "lucide-react"

interface DemandPrediction {
  date: string
  occupancyPrediction: number
  confidence: number
  factors: string[]
  events: string[]
  recommendation: string
  riskLevel: "low" | "medium" | "high"
}

const mockPredictions: DemandPrediction[] = [
  {
    date: "2025-09-24",
    occupancyPrediction: 92,
    confidence: 88,
    factors: ["Fin de semana", "Evento local", "Temporada alta"],
    events: ["Concierto en Auditorio Nacional", "Conferencia empresarial"],
    recommendation: "Aumentar tarifas 15% - demanda muy alta",
    riskLevel: "low",
  },
  {
    date: "2025-09-25",
    occupancyPrediction: 95,
    confidence: 91,
    factors: ["Sábado", "Evento deportivo", "Turismo familiar"],
    events: ["Partido de fútbol", "Festival gastronómico"],
    recommendation: "Mantener tarifas premium - ocupación máxima esperada",
    riskLevel: "low",
  },
  {
    date: "2025-09-26",
    occupancyPrediction: 78,
    confidence: 82,
    factors: ["Domingo", "Check-outs masivos", "Inicio semana laboral"],
    events: [],
    recommendation: "Reducir tarifas 8% para mantener ocupación",
    riskLevel: "medium",
  },
  {
    date: "2025-09-27",
    occupancyPrediction: 65,
    confidence: 75,
    factors: ["Lunes", "Temporada media", "Turismo de negocios"],
    events: ["Reunión corporativa"],
    recommendation: "Promociones para turismo de negocios",
    riskLevel: "medium",
  },
  {
    date: "2025-09-28",
    occupancyPrediction: 58,
    confidence: 79,
    factors: ["Martes", "Baja demanda histórica", "Competencia agresiva"],
    events: [],
    recommendation: "Estrategia de precios competitiva necesaria",
    riskLevel: "high",
  },
]

export function DemandForecast() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-error/10 text-error border-error/20"
      case "medium":
        return "bg-warning/10 text-warning border-warning/20"
      default:
        return "bg-success/10 text-success border-success/20"
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "high":
        return "Alto Riesgo"
      case "medium":
        return "Riesgo Medio"
      default:
        return "Bajo Riesgo"
    }
  }

  const averageOccupancy = Math.round(
    mockPredictions.reduce((sum, p) => sum + p.occupancyPrediction, 0) / mockPredictions.length,
  )

  const averageConfidence = Math.round(
    mockPredictions.reduce((sum, p) => sum + p.confidence, 0) / mockPredictions.length,
  )

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ocupación Promedio</p>
              <p className="text-xl font-bold text-foreground">{averageOccupancy}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confianza IA</p>
              <p className="text-xl font-bold text-foreground">{averageConfidence}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Días de Riesgo</p>
              <p className="text-xl font-bold text-foreground">
                {mockPredictions.filter((p) => p.riskLevel === "high").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Forecast Timeline */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Predicción de Demanda - Próximos 5 Días</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Actualizado cada hora</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockPredictions.map((prediction, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">
                      {new Date(prediction.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </h4>
                    <Badge className={getRiskColor(prediction.riskLevel)} variant="outline">
                      {getRiskText(prediction.riskLevel)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{prediction.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{prediction.occupancyPrediction}%</p>
                  <p className="text-sm text-muted-foreground">Ocupación prevista</p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Confianza de Predicción</span>
                  <span className="text-sm font-medium text-accent">{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              {/* Factors */}
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Factores Influyentes</p>
                <div className="flex flex-wrap gap-2">
                  {prediction.factors.map((factor, factorIndex) => (
                    <Badge key={factorIndex} variant="outline" className="bg-muted text-muted-foreground">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Events */}
              {prediction.events.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Eventos Locales</p>
                  <div className="space-y-1">
                    {prediction.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium text-accent mb-1">Recomendación IA</p>
                <p className="text-sm text-muted-foreground">{prediction.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Users, DollarSign, Target, Zap, Gift, Star, Calendar, BarChart } from "lucide-react"

interface Recommendation {
  id: string
  type: "upsell" | "service" | "experience" | "retention" | "pricing"
  title: string
  description: string
  confidence: number
  potentialRevenue: number
  targetGuest?: string
  priority: "low" | "medium" | "high" | "critical"
  category: string
  actionRequired: string
  estimatedImpact: string
}

interface RecommendationDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recommendation: Recommendation | null
}

export function RecommendationDetailsDialog({ open, onOpenChange, recommendation }: RecommendationDetailsDialogProps) {
  if (!recommendation) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "upsell":
        return <TrendingUp className="h-5 w-5" />
      case "service":
        return <Gift className="h-5 w-5" />
      case "experience":
        return <Star className="h-5 w-5" />
      case "retention":
        return <Users className="h-5 w-5" />
      case "pricing":
        return <DollarSign className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-error/10 text-error border-error/20"
      case "medium":
        return "bg-warning/10 text-warning border-warning/20"
      default:
        return "bg-success/10 text-success border-success/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "upsell":
        return "bg-accent/10 text-accent"
      case "service":
        return "bg-purple-500/10 text-purple-500"
      case "experience":
        return "bg-yellow-500/10 text-yellow-500"
      case "retention":
        return "bg-blue-500/10 text-blue-500"
      case "pricing":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)}`}>
              {getTypeIcon(recommendation.type)}
            </div>
            <span>{recommendation.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex items-center space-x-2">
            <Badge className={getTypeColor(recommendation.type)} variant="outline">
              {recommendation.type}
            </Badge>
            <Badge className={getPriorityColor(recommendation.priority)} variant="outline">
              Prioridad: {recommendation.priority}
            </Badge>
            <Badge variant="outline">{recommendation.category}</Badge>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Descripción</h4>
            <p className="text-muted-foreground">{recommendation.description}</p>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-foreground">Ingresos Potenciales</span>
              </div>
              <p className="text-2xl font-bold text-success">${recommendation.potentialRevenue.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-foreground">Confianza de IA</span>
              </div>
              <p className="text-2xl font-bold text-accent">{recommendation.confidence}%</p>
            </div>
          </div>

          {/* Confidence Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Nivel de Confianza</span>
              <span className="text-sm font-medium text-accent">{recommendation.confidence}%</span>
            </div>
            <Progress value={recommendation.confidence} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              Basado en análisis de datos históricos y patrones de comportamiento
            </p>
          </div>

          <Separator />

          {/* Target Guest */}
          {recommendation.targetGuest && (
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-accent" />
                <h4 className="font-semibold text-foreground">Huésped Objetivo</h4>
              </div>
              <p className="text-foreground font-medium">{recommendation.targetGuest}</p>
            </div>
          )}

          {/* Action Required */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-accent" />
              <h4 className="font-semibold text-foreground">Acción Requerida</h4>
            </div>
            <p className="text-muted-foreground">{recommendation.actionRequired}</p>
          </div>

          {/* Estimated Impact */}
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-success" />
              <h4 className="font-semibold text-foreground">Impacto Estimado</h4>
            </div>
            <p className="text-muted-foreground">{recommendation.estimatedImpact}</p>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-5 w-5 text-accent" />
              <h4 className="font-semibold text-foreground">Línea de Tiempo Sugerida</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Inmediato (0-24h)</p>
                  <p className="text-sm text-muted-foreground">Revisar y aprobar recomendación</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Corto plazo (1-3 días)</p>
                  <p className="text-sm text-muted-foreground">Implementar acción requerida</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Mediano plazo (1-2 semanas)</p>
                  <p className="text-sm text-muted-foreground">Medir resultados y ajustar estrategia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

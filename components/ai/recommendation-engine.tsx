"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, Users, DollarSign, Target, Zap, Gift, Star } from "lucide-react"

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

interface RecommendationEngineProps {
  recommendations: Recommendation[]
  onApplyRecommendation: (id: string) => void
  onDismissRecommendation: (id: string) => void
}

export function RecommendationEngine({
  recommendations,
  onApplyRecommendation,
  onDismissRecommendation,
}: RecommendationEngineProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "upsell":
        return <TrendingUp className="h-4 w-4" />
      case "service":
        return <Gift className="h-4 w-4" />
      case "experience":
        return <Star className="h-4 w-4" />
      case "retention":
        return <Users className="h-4 w-4" />
      case "pricing":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
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
        return "bg-accent/10 text-accent border-accent/20"
      case "service":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "experience":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "retention":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pricing":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const categories = ["all", "upsell", "service", "experience", "retention", "pricing"]
  const filteredRecommendations =
    selectedCategory === "all" ? recommendations : recommendations.filter((r) => r.type === selectedCategory)

  const totalPotentialRevenue = recommendations.reduce((sum, r) => sum + r.potentialRevenue, 0)
  const highPriorityCount = recommendations.filter((r) => r.priority === "high" || r.priority === "critical").length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recomendaciones Activas</p>
              <p className="text-xl font-bold text-foreground">{recommendations.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingresos Potenciales</p>
              <p className="text-xl font-bold text-foreground">${totalPotentialRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-error/10">
              <Target className="h-5 w-5 text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alta Prioridad</p>
              <p className="text-xl font-bold text-foreground">{highPriorityCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Motor de Recomendaciones IA</h3>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Actualizado hace 5 min</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "Todas" : category}
            </Button>
          ))}
        </div>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="p-6 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type).split(" ")[0]}`}>
                  {getTypeIcon(recommendation.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{recommendation.title}</h4>
                    <Badge className={getTypeColor(recommendation.type)} variant="outline">
                      {recommendation.type}
                    </Badge>
                    <Badge className={getPriorityColor(recommendation.priority)} variant="outline">
                      {recommendation.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{recommendation.description}</p>
                  {recommendation.targetGuest && (
                    <p className="text-sm font-medium text-accent">Objetivo: {recommendation.targetGuest}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">+${recommendation.potentialRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Ingresos potenciales</p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Confianza de IA</span>
                <span className="text-sm font-medium text-accent">{recommendation.confidence}%</span>
              </div>
              <Progress value={recommendation.confidence} className="h-2" />
            </div>

            {/* Action Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-medium text-foreground mb-1">Acción Requerida</p>
                <p className="text-sm text-muted-foreground">{recommendation.actionRequired}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-medium text-foreground mb-1">Impacto Estimado</p>
                <p className="text-sm text-muted-foreground">{recommendation.estimatedImpact}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                onClick={() => onApplyRecommendation(recommendation.id)}
                className="flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Aplicar Recomendación</span>
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDismissRecommendation(recommendation.id)}>
                Descartar
              </Button>
              <Button size="sm" variant="ghost">
                Ver Detalles
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card className="p-8 text-center">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay recomendaciones disponibles para la categoría seleccionada</p>
        </Card>
      )}
    </div>
  )
}

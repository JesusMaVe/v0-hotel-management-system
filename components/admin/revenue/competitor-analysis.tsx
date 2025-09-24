"use client";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Eye, Star, MapPin } from "lucide-react";

interface Competitor {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  rooms: {
    standard: number;
    suite: number;
    premium: number;
  };
  occupancy: number;
  averageRate: number;
  priceChange: number;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
}

const mockCompetitors: Competitor[] = [
  {
    id: "comp-1",
    name: "Hotel Presidente InterContinental",
    category: "Lujo",
    distance: "2.1 km",
    rating: 4.5,
    rooms: { standard: 2100, suite: 2800, premium: 4200 },
    occupancy: 82,
    averageRate: 2650,
    priceChange: 5,
    marketShare: 18,
    strengths: ["Ubicación céntrica", "Marca reconocida", "Servicios premium"],
    weaknesses: ["Precios altos", "Instalaciones antiguas"],
  },
  {
    id: "comp-2",
    name: "Four Seasons Mexico City",
    category: "Ultra Lujo",
    distance: "3.8 km",
    rating: 4.8,
    rooms: { standard: 3200, suite: 4500, premium: 6800 },
    occupancy: 75,
    averageRate: 4200,
    priceChange: -2,
    marketShare: 12,
    strengths: ["Servicio excepcional", "Instalaciones nuevas", "Gastronomía"],
    weaknesses: ["Muy caro", "Capacidad limitada"],
  },
  {
    id: "comp-3",
    name: "Hilton Mexico City Reforma",
    category: "Premium",
    distance: "1.5 km",
    rating: 4.2,
    rooms: { standard: 1800, suite: 2400, premium: 3600 },
    occupancy: 88,
    averageRate: 2200,
    priceChange: 8,
    marketShare: 22,
    strengths: ["Precio competitivo", "Alta ocupación", "Programa lealtad"],
    weaknesses: ["Servicios básicos", "Mantenimiento"],
  },
  {
    id: "comp-4",
    name: "Sheraton Maria Isabel",
    category: "Premium",
    distance: "2.8 km",
    rating: 4.0,
    rooms: { standard: 1650, suite: 2200, premium: 3200 },
    occupancy: 79,
    averageRate: 1950,
    priceChange: 3,
    marketShare: 15,
    strengths: ["Ubicación", "Eventos corporativos", "Precio moderado"],
    weaknesses: ["Instalaciones desactualizadas", "Servicio inconsistente"],
  },
];

export function CompetitorAnalysis() {
  const ourHotel = {
    name: "Villa Magna Family Resorts",
    occupancy: 78,
    averageRate: 2456,
    marketShare: 16,
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Ultra Lujo":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Lujo":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Premium":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Position Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Posición en el Mercado
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Villa Magna</p>
            <p className="text-xl font-bold text-accent">
              ${ourHotel.averageRate}
            </p>
            <p className="text-sm text-muted-foreground">
              {ourHotel.occupancy}% ocupación
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">
              Promedio Mercado
            </p>
            <p className="text-xl font-bold text-foreground">
              $
              {Math.round(
                mockCompetitors.reduce((sum, c) => sum + c.averageRate, 0) /
                  mockCompetitors.length,
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {Math.round(
                mockCompetitors.reduce((sum, c) => sum + c.occupancy, 0) /
                  mockCompetitors.length,
              )}
              % ocupación
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Participación</p>
            <p className="text-xl font-bold text-foreground">
              {ourHotel.marketShare}%
            </p>
            <p className="text-sm text-success">Posición #3</p>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Oportunidad</p>
            <p className="text-xl font-bold text-success">+12%</p>
            <p className="text-sm text-muted-foreground">Potencial ingresos</p>
          </div>
        </div>

        {/* Market Share Visualization */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">
            Participación de Mercado
          </p>
          {[
            ourHotel,
            ...mockCompetitors.sort((a, b) => b.marketShare - a.marketShare),
          ].map((hotel, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-32 text-sm font-medium text-foreground truncate">
                {hotel.name}
              </div>
              <div className="flex-1">
                <Progress value={hotel.marketShare} className="h-3" />
              </div>
              <div className="w-12 text-sm font-medium text-foreground text-right">
                {hotel.marketShare}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Competitor Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCompetitors.map((competitor) => (
          <Card key={competitor.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">
                    {competitor.name}
                  </h4>
                  <Badge
                    className={getCategoryColor(competitor.category)}
                    variant="outline"
                  >
                    {competitor.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{competitor.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span>{competitor.rating}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Pricing Comparison */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded bg-muted">
                <p className="text-xs text-muted-foreground">Standard</p>
                <p className="font-medium text-foreground">
                  ${competitor.rooms.standard}
                </p>
              </div>
              <div className="text-center p-2 rounded bg-muted">
                <p className="text-xs text-muted-foreground">Suite</p>
                <p className="font-medium text-foreground">
                  ${competitor.rooms.suite}
                </p>
              </div>
              <div className="text-center p-2 rounded bg-muted">
                <p className="text-xs text-muted-foreground">Premium</p>
                <p className="font-medium text-foreground">
                  ${competitor.rooms.premium}
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ocupación</p>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={competitor.occupancy}
                    className="flex-1 h-2"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {competitor.occupancy}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Cambio de Precio
                </p>
                <div
                  className={`flex items-center space-x-1 ${getChangeColor(competitor.priceChange)}`}
                >
                  {getChangeIcon(competitor.priceChange)}
                  <span className="font-medium">
                    {competitor.priceChange > 0 ? "+" : ""}
                    {competitor.priceChange}%
                  </span>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Fortalezas
                </p>
                <div className="flex flex-wrap gap-1">
                  {competitor.strengths.map((strength, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-success/10 text-success border-success/20 text-xs"
                    >
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Debilidades
                </p>
                <div className="flex flex-wrap gap-1">
                  {competitor.weaknesses.map((weakness, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-error/10 text-error border-error/20 text-xs"
                    >
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

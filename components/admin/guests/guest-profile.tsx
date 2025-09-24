"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Heart,
  Utensils,
  Space as Spa,
  Car,
  Wifi,
} from "lucide-react";

interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalVisits: number;
  totalSpent: number;
  averageStay: number;
  lastVisit: string;
  preferences: {
    dietary: string[];
    services: string[];
    roomType: string;
    amenities: string[];
  };
  satisfactionScore: number;
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  aiInsights: {
    spendingPattern: string;
    preferredSeason: string;
    upsellProbability: number;
    churnRisk: "low" | "medium" | "high";
    nextVisitPrediction: string;
  };
}

interface GuestProfileProps {
  guest: GuestProfile;
  recommendations: any[];
}

export function GuestProfile({ guest, recommendations }: GuestProfileProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "gold":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "silver":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-amber-600/10 text-amber-600 border-amber-600/20";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-error/10 text-error border-error/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-success/10 text-success border-success/20";
    }
  };

  const getPreferenceIcon = (preference: string) => {
    switch (preference) {
      case "spa":
        return <Spa className="h-4 w-4" />;
      case "restaurante":
        return <Utensils className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent/10">
              <User className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {guest.name}
              </h2>
              <p className="text-muted-foreground">{guest.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {guest.city}
                </span>
              </div>
            </div>
          </div>
          <Badge className={getTierColor(guest.loyaltyTier)} variant="outline">
            {guest.loyaltyTier.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-lg font-bold text-foreground">
              {guest.totalVisits}
            </p>
            <p className="text-sm text-muted-foreground">Visitas</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-lg font-bold text-foreground">
              ${guest.totalSpent.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Gasto Total</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-lg font-bold text-foreground">
              {guest.averageStay}
            </p>
            <p className="text-sm text-muted-foreground">Días Promedio</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <p className="text-lg font-bold text-foreground">
                {guest.satisfactionScore}/5
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Satisfacción</p>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Insights de IA
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div>
              <p className="font-medium text-foreground">Patrón de Gasto</p>
              <p className="text-sm text-muted-foreground">
                {guest.aiInsights.spendingPattern}
              </p>
            </div>
            <DollarSign className="h-5 w-5 text-accent" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div>
              <p className="font-medium text-foreground">Temporada Preferida</p>
              <p className="text-sm text-muted-foreground">
                {guest.aiInsights.preferredSeason}
              </p>
            </div>
            <Calendar className="h-5 w-5 text-accent" />
          </div>

          <div className="p-3 rounded-lg bg-muted">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-foreground">
                Probabilidad de Upselling
              </p>
              <span className="text-sm font-medium text-accent">
                {guest.aiInsights.upsellProbability}%
              </span>
            </div>
            <Progress
              value={guest.aiInsights.upsellProbability}
              className="h-2"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div>
              <p className="font-medium text-foreground">Riesgo de Abandono</p>
              <Badge
                className={getRiskColor(guest.aiInsights.churnRisk)}
                variant="outline"
              >
                {guest.aiInsights.churnRisk.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="font-medium text-accent">Predicción Próxima Visita</p>
            <p className="text-sm text-muted-foreground mt-1">
              {guest.aiInsights.nextVisitPrediction}
            </p>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Preferencias del Huésped
        </h3>

        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-2">Alimenticias</p>
            <div className="flex flex-wrap gap-2">
              {guest.preferences.dietary.map((diet, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">
              Servicios Favoritos
            </p>
            <div className="flex flex-wrap gap-2">
              {guest.preferences.services.map((service, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-accent/10 text-accent border-accent/20 flex items-center space-x-1"
                >
                  {getPreferenceIcon(service)}
                  <span>{service}</span>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">
              Tipo de Habitación Preferida
            </p>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              {guest.preferences.roomType}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

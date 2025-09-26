"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Utensils,
  Mountain,
  Waves,
  Space as Spa,
  Camera,
  Music,
  Search,
  Star,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  duration: string;
  groupSize: string;
  location: string;
  price: string;
  tags: string[];
  featured: boolean;
}

const categories = [
  { id: "dining", label: "Gastronomía", icon: Utensils },
  { id: "nightlife", label: "Vida nocturna", icon: Music },
  { id: "culture", label: "Cultura", icon: Camera },
  { id: "wellness", label: "Bienestar", icon: Spa },
];

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Cena en azotea al atardecer",
    description: "Cena exclusiva con vistas a la ciudad",
    category: "dining",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    duration: "3-4 horas",
    groupSize: "2-3 personas",
    location: "Azotea del resort",
    price: "$85/persona",
    tags: ["Premium", "Romántico", "Vista al océano"],
    featured: true,
  },
  {
    id: "2",
    title: "Yoga y meditación privada",
    description:
      "Comienza tu día con movimiento consciente con una sesión de Yoga",
    category: "wellness",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    duration: "1 hora",
    groupSize: "1-2 personas",
    location: "Playa privada",
    price: "$45/persona",
    tags: ["Bienestar", "Mañana", "Tranquilo"],
    featured: true,
  },
];

export function GuestRecommendations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecommendations = mockRecommendations.filter((rec) => {
    const matchesCategory =
      activeCategory === "all" || rec.category === activeCategory;
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredRecommendations = filteredRecommendations.filter(
    (rec) => rec.featured,
  );
  const regularRecommendations = filteredRecommendations.filter(
    (rec) => !rec.featured,
  );

  return (
    <div className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="grid w-full gap-4">
        {/* Encabezado */}
        <div className="pt-6 pb-3">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Recomendaciones Personalizadas
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Experiencias seleccionadas según tus preferencias e historial de
            estancia
          </p>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Buscar experiencias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-3 py-3 bg-card border-border/50 focus:border-hotel-accent w-full rounded-lg text-base"
          />
        </div>

        {/* Filtros de categoría */}
        <div className="flex gap-2 max-w-[90vw] mt-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm rounded-full transition-all",
                  isActive
                    ? "bg-hotel-accent text-white hover:bg-hotel-accent/90"
                    : "bg-card hover:bg-accent border-border/50",
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Contenido principal */}
        <div className="w-full grid justify-items-center">
          {/* Recomendaciones destacadas */}
          {featuredRecommendations.length > 0 && (
            <div className="space-y-4 col-span-full">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-hotel-accent fill-current" />
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Destacadas para ti
                </h2>
              </div>
              <div className="grid grid-cols-1 justify-items-center gap-2">
                {featuredRecommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    featured
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  featured = false,
}: {
  recommendation: Recommendation;
  featured?: boolean;
}) {
  return (
    <Card
      className={cn(
        "w-[96%] overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        "bg-card border-border/50 rounded-xl",
        featured && "ring-2 ring-hotel-accent/20",
      )}
    >
      <div className="relative">
        <img
          src={recommendation.image || "/placeholder.svg"}
          alt={recommendation.title}
          className="w-full h-48 object-cover sm:h-56"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-hotel-accent text-white rounded-full px-2 py-1">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Destacado
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
          {recommendation.price}
        </div>
      </div>

      <CardContent className="p-4 space-y-3 text-sm sm:text-base">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {recommendation.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {recommendation.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-muted-foreground text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{recommendation.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recommendation.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recommendation.groupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{recommendation.location}</span>
          </div>
        </div>

        <Button className="w-full bg-hotel-accent hover:bg-hotel-accent/90 text-white py-3 text-base rounded-full">
          Reservar experiencia
        </Button>
      </CardContent>
    </Card>
  );
}

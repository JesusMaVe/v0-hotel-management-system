"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { chartCatalog } from "@/lib/charts/mocks";
import Link from "next/link";
import { ChartCard } from "./chart-card";

export function ChartCatalog() {
  return (
    <div className="space-y-6">
      {/* Statistical Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="grid gap-2">
            <h3 className="text-xl font-bold text-foreground">
              Catálogo de gráficos estadísticos
            </h3>
            <h4 className="font-medium text-foreground">
              Haga clic sobre la tarjeta que contiene el gráfico de su interés
            </h4>
          </div>

          {/* second flex item */}
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Predicciones y análisis de la situación presente
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartCatalog.map((chart) => (
            <Link key={chart.id} href={`/admin/analytics/${chart.id}`}>
              <ChartCard
                key={chart.id}
                chart={chart}
                onClick={(c) => console.log("Clicked chart:", c)}
              />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

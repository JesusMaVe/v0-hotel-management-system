"use client";

import { ChartCard } from "@/components/ui/chart-card";
import { TrendingUp } from "lucide-react";

const revenueData = [
  { month: "Ene", revenue: 450000, target: 420000 },
  { month: "Feb", revenue: 520000, target: 480000 },
  { month: "Mar", revenue: 480000, target: 500000 },
  { month: "Abr", revenue: 620000, target: 580000 },
  { month: "May", revenue: 580000, target: 600000 },
  { month: "Jun", revenue: 720000, target: 680000 },
];

export function RevenueTrend() {
  const maxRevenue = Math.max(
    ...revenueData.map((d) => Math.max(d.revenue, d.target)),
  );

  return (
    <ChartCard title="Tendencia de Ingresos" icon={TrendingUp}>
      <div className="space-y-4">
        {/* Summary */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
          <div>
            <p className="text-sm text-muted-foreground">Ingresos Junio</p>
            <p className="text-2xl font-bold text-foreground">$720,000</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">vs Objetivo</p>
            <p className="text-lg font-semibold text-success">+5.9%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-2">
          {revenueData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 text-sm font-medium text-muted-foreground">
                {data.month}
              </div>
              <div className="flex-1 relative">
                {/* Target line */}
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="h-0.5 bg-warning rounded-full"
                    style={{ width: `${(data.target / maxRevenue) * 100}%` }}
                  />
                </div>
                {/* Revenue bar */}
                <div className="bg-muted rounded-sm h-8 flex items-center overflow-hidden">
                  <div
                    className="bg-chart-1 h-full rounded-sm flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      ${(data.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            <span className="text-muted-foreground">Ingresos Reales</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-warning"></div>
            <span className="text-muted-foreground">Objetivo</span>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

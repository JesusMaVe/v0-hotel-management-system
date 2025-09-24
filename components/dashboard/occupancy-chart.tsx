"use client"

import { ChartCard } from "@/components/ui/chart-card"
import { BarChart3 } from "lucide-react"

const occupancyData = [
  { day: "Lun", standard: 85, suite: 92, ejecutiva: 78 },
  { day: "Mar", standard: 78, suite: 88, ejecutiva: 85 },
  { day: "Mié", standard: 92, suite: 95, ejecutiva: 90 },
  { day: "Jue", standard: 88, suite: 90, ejecutiva: 82 },
  { day: "Vie", standard: 95, suite: 98, ejecutiva: 95 },
  { day: "Sáb", standard: 98, suite: 100, ejecutiva: 98 },
  { day: "Dom", standard: 82, suite: 85, ejecutiva: 80 },
]

export function OccupancyChart() {
  return (
    <ChartCard title="Ocupación por Tipo de Habitación" icon={BarChart3}>
      <div className="space-y-4">
        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            <span className="text-muted-foreground">Standard</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            <span className="text-muted-foreground">Suite</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-3"></div>
            <span className="text-muted-foreground">Ejecutiva</span>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-3">
          {occupancyData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 text-sm font-medium text-muted-foreground">{data.day}</div>
              <div className="flex-1 flex space-x-1">
                <div className="flex-1 bg-muted rounded-sm overflow-hidden">
                  <div
                    className="bg-chart-1 h-6 rounded-sm flex items-center justify-center transition-all duration-300"
                    style={{ width: `${data.standard}%` }}
                  >
                    <span className="text-xs font-medium text-white">{data.standard}%</span>
                  </div>
                </div>
                <div className="flex-1 bg-muted rounded-sm overflow-hidden">
                  <div
                    className="bg-chart-2 h-6 rounded-sm flex items-center justify-center transition-all duration-300"
                    style={{ width: `${data.suite}%` }}
                  >
                    <span className="text-xs font-medium text-white">{data.suite}%</span>
                  </div>
                </div>
                <div className="flex-1 bg-muted rounded-sm overflow-hidden">
                  <div
                    className="bg-chart-3 h-6 rounded-sm flex items-center justify-center transition-all duration-300"
                    style={{ width: `${data.ejecutiva}%` }}
                  >
                    <span className="text-xs font-medium text-white">{data.ejecutiva}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

import { Header } from "@/components/layout/header"
import { StatCard } from "@/components/ui/stat-card"
import { OccupancyChart } from "@/components/dashboard/occupancy-chart"
import { RevenueTrend } from "@/components/dashboard/revenue-trend"
import { RealTimeMetrics } from "@/components/dashboard/real-time-metrics"
import { Users, DollarSign, Bed, TrendingUp, Calendar, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard Principal" subtitle="Resumen en tiempo real de Villa Magna Family Resorts" />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Ocupación Actual" value="78%" change={{ value: 12, type: "increase" }} icon={Bed} />
          <StatCard title="RevPAR" value="$2,456" change={{ value: 8, type: "increase" }} icon={DollarSign} />
          <StatCard
            title="Ingresos del Día"
            value="$145,600"
            change={{ value: 15, type: "increase" }}
            icon={TrendingUp}
          />
          <StatCard title="Huéspedes Activos" value="156" change={{ value: 3, type: "decrease" }} icon={Users} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OccupancyChart />
          <RevenueTrend />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Próximas Llegadas */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Próximas Llegadas</h3>
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-3">
              {[
                { name: "Ana María González", room: "101", time: "14:30" },
                { name: "Carlos Rodríguez", room: "205", time: "15:15" },
                { name: "María José López", room: "312", time: "16:00" },
              ].map((guest, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">{guest.name}</p>
                    <p className="text-sm text-muted-foreground">Habitación {guest.room}</p>
                  </div>
                  <span className="text-sm font-medium text-accent">{guest.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas Críticas */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Alertas Críticas</h3>
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div className="space-y-3">
              {[
                { type: "Mantenimiento", message: "Habitación 203 - A/C no funciona", priority: "high" },
                { type: "Overbooking", message: "Suite Ejecutiva - 2 reservas extras", priority: "critical" },
                { type: "No-show", message: "Reserva #1234 - Sin confirmar", priority: "medium" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.priority === "critical"
                        ? "bg-error"
                        : alert.priority === "high"
                          ? "bg-warning"
                          : "bg-accent"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predicciones IA */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Predicciones IA</h3>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Ocupación próximos 7 días</p>
                <div className="flex items-center space-x-1">
                  {[85, 92, 76, 88, 91, 87, 82].map((value, index) => (
                    <div key={index} className="flex-1 bg-muted rounded-sm overflow-hidden">
                      <div
                        className="bg-accent h-8 rounded-sm flex items-center justify-center"
                        style={{ height: `${(value / 100) * 32}px` }}
                      >
                        <span className="text-xs font-medium text-accent-foreground">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm font-medium text-success">Recomendación</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Aumentar tarifas 15% para el fin de semana debido a alta demanda prevista
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Metrics */}
          <RealTimeMetrics />
        </div>
      </div>
    </div>
  )
}

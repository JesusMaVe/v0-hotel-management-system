import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  icon: LucideIcon
  className?: string
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-200 group",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn("text-sm font-medium", change.type === "increase" ? "text-success" : "text-error")}>
                {change.type === "increase" ? "+" : "-"}
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  )
}

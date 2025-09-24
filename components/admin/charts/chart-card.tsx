import { Progress } from "@/components/ui/progress";
import { Chart } from "@/lib/charts/types";

interface ChartCardProps {
  chart: Chart;
  onClick?: (chart: Chart) => void;
}

export const ChartCard: React.FC<ChartCardProps> = ({ chart, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(chart)}
      className="p-4 rounded-lg border border-border hover:bg-orange-200 hover:border-accent transition-colors cursor-pointer"
    >
      {/* Encabezado: ícono + estado */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`p-2 rounded-lg bg-${chart.color}/10 text-${chart.color}`}
        >
          {chart.icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {chart.status}
        </span>
      </div>

      {/* Contenido principal */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{chart.description}</p>
        <h3 className="text-xl font-bold text-foreground">{chart.name}</h3>

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            {chart.helpText.primary}
          </span>
          <span className="text-muted-foreground">
            {chart.helpText.secondary}
          </span>
        </div>

        {/* Ejemplo: progreso solo si quieres representar algo con target dinámico */}
        {chart.content.type === "RADAR" && (
          <div className="pt-1">
            <Progress
              value={
                (chart.content.baseData.reduce(
                  (acc, d) => acc + d.maxValue,
                  0,
                ) /
                  (chart.content.baseData.length * 10)) *
                100
              }
              className="h-1.5"
            />
          </div>
        )}
      </div>
    </div>
  );
};

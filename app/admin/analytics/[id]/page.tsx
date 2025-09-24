"use client";

import { ChartTypeHandler } from "@/components/admin/charts/chart-type-handler";
import { ChartContainer } from "@/components/admin/charts/ui/chart-container";
import { Header } from "@/components/layout/header";
import { chartCatalog } from "@/lib/charts/mocks";
import { usePathname } from "next/navigation";

export default function ChartDetailsPage() {
  const pathname = usePathname();
  const chartId = pathname.split("/").pop();

  const chart = chartCatalog.find((chart) => chart.id === chartId);

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Analytics y Reportes"
        subtitle="Dashboards ejecutivos, reportes financieros y análisis predictivo con IA"
      />
      <ChartContainer>
        <ChartTypeHandler chart={chart} />
      </ChartContainer>
    </div>
  );
}

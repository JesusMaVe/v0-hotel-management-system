"use client";

import { Header } from "@/components/layout/header";
import { ExecutiveDashboard } from "@/components/admin/analytics/executive-dashboard";
import { FinancialReports } from "@/components/admin/analytics/financial-reports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCatalog } from "@/components/admin/charts/chart-catalog";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Analytics y Reportes"
        subtitle="Dashboards ejecutivos, reportes financieros y análisis predictivo con IA"
      />

      <div className="flex-1 p-6">
        <Tabs defaultValue="executive" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="executive">Dashboard Ejecutivo</TabsTrigger>
            <TabsTrigger value="financial">Reportes Financieros</TabsTrigger>
          </TabsList>

          <TabsContent value="executive">
            <div className="space-y-8">
              <ExecutiveDashboard />
              <ChartCatalog />
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

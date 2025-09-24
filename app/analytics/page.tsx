"use client"

import { Header } from "@/components/layout/header"
import { ExecutiveDashboard } from "@/components/analytics/executive-dashboard"
import { FinancialReports } from "@/components/analytics/financial-reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

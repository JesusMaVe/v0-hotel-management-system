"use client";

import { Header } from "@/components/layout/header";
import { PricingSimulator } from "@/components/admin/revenue/pricing-simulator";
import { DemandForecast } from "@/components/admin/revenue/demand-forecast";
import { CompetitorAnalysis } from "@/components/admin/revenue/competitor-analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RevenuePage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Revenue Management"
        subtitle="Pricing dinámico, análisis de competencia y predicciones de demanda con IA"
      />

      <div className="flex-1 p-6">
        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pricing">Pricing Dinámico</TabsTrigger>
            <TabsTrigger value="demand">Predicción Demanda</TabsTrigger>
            <TabsTrigger value="competition">Análisis Competencia</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing">
            <PricingSimulator />
          </TabsContent>

          <TabsContent value="demand">
            <DemandForecast />
          </TabsContent>

          <TabsContent value="competition">
            <CompetitorAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

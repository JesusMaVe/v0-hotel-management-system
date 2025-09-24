"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  DollarSign,
  TrendingUp,
  PieChart,
  Target,
} from "lucide-react";

interface FinancialData {
  period: string;
  revenue: {
    rooms: number;
    food: number;
    spa: number;
    events: number;
    other: number;
    total: number;
  };
  costs: {
    staff: number;
    utilities: number;
    maintenance: number;
    marketing: number;
    other: number;
    total: number;
  };
  profit: number;
  margin: number;
}

const mockFinancialData: FinancialData[] = [
  {
    period: "Septiembre 2025",
    revenue: {
      rooms: 1650000,
      food: 285000,
      spa: 125000,
      events: 85000,
      other: 45000,
      total: 2190000,
    },
    costs: {
      staff: 650000,
      utilities: 180000,
      maintenance: 95000,
      marketing: 120000,
      other: 85000,
      total: 1130000,
    },
    profit: 1060000,
    margin: 48.4,
  },
  {
    period: "Agosto 2025",
    revenue: {
      rooms: 1520000,
      food: 265000,
      spa: 110000,
      events: 75000,
      other: 40000,
      total: 2010000,
    },
    costs: {
      staff: 620000,
      utilities: 175000,
      maintenance: 88000,
      marketing: 110000,
      other: 80000,
      total: 1073000,
    },
    profit: 937000,
    margin: 46.6,
  },
];

export function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("Septiembre 2025");
  const [reportType, setReportType] = useState("summary");

  const currentData =
    mockFinancialData.find((d) => d.period === selectedPeriod) ||
    mockFinancialData[0];
  const previousData = mockFinancialData[1];

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const revenueChange = calculateChange(
    currentData.revenue.total,
    previousData.revenue.total,
  );
  const profitChange = calculateChange(currentData.profit, previousData.profit);

  const exportReport = (format: string) => {
    console.log(`Exportando reporte en formato ${format}`);
    // TODO: Implement actual export functionality
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Septiembre 2025">Septiembre 2025</SelectItem>
                <SelectItem value="Agosto 2025">Agosto 2025</SelectItem>
                <SelectItem value="Julio 2025">Julio 2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Resumen Ejecutivo</SelectItem>
                <SelectItem value="detailed">Reporte Detallado</SelectItem>
                <SelectItem value="comparative">
                  Análisis Comparativo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportReport("pdf")}
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportReport("excel")}
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingresos Totales</p>
              <p className="text-xl font-bold text-foreground">
                ${currentData.revenue.total.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-success">
                  +{revenueChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-error/10">
              <TrendingUp className="h-5 w-5 text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Costos Totales</p>
              <p className="text-xl font-bold text-foreground">
                ${currentData.costs.total.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-muted-foreground">
                  {(
                    (currentData.costs.total / currentData.revenue.total) *
                    100
                  ).toFixed(1)}
                  % de ingresos
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <PieChart className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilidad Neta</p>
              <p className="text-xl font-bold text-foreground">
                ${currentData.profit.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-success">
                  +{profitChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Target className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Margen de Utilidad
              </p>
              <p className="text-xl font-bold text-foreground">
                {currentData.margin}%
              </p>
              <Badge
                className="bg-success/10 text-success border-success/20 mt-1"
                variant="outline"
              >
                Excelente
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">
            Desglose de Ingresos
          </h4>
          <div className="space-y-4">
            {[
              {
                name: "Habitaciones",
                amount: currentData.revenue.rooms,
                color: "bg-chart-1",
              },
              {
                name: "Alimentos y Bebidas",
                amount: currentData.revenue.food,
                color: "bg-chart-2",
              },
              {
                name: "Spa y Bienestar",
                amount: currentData.revenue.spa,
                color: "bg-chart-3",
              },
              {
                name: "Eventos",
                amount: currentData.revenue.events,
                color: "bg-chart-4",
              },
              {
                name: "Otros Servicios",
                amount: currentData.revenue.other,
                color: "bg-chart-5",
              },
            ].map((item, index) => {
              const percentage =
                (item.amount / currentData.revenue.total) * 100;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">
            Desglose de Costos
          </h4>
          <div className="space-y-4">
            {[
              {
                name: "Personal",
                amount: currentData.costs.staff,
                color: "bg-error",
              },
              {
                name: "Servicios Públicos",
                amount: currentData.costs.utilities,
                color: "bg-warning",
              },
              {
                name: "Mantenimiento",
                amount: currentData.costs.maintenance,
                color: "bg-accent",
              },
              {
                name: "Marketing",
                amount: currentData.costs.marketing,
                color: "bg-success",
              },
              {
                name: "Otros",
                amount: currentData.costs.other,
                color: "bg-muted-foreground",
              },
            ].map((item, index) => {
              const percentage = (item.amount / currentData.costs.total) * 100;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-muted rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">
          Comparación Mensual
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Concepto
                </th>
                <th className="text-right py-3 px-4 font-medium text-foreground">
                  Septiembre
                </th>
                <th className="text-right py-3 px-4 font-medium text-foreground">
                  Agosto
                </th>
                <th className="text-right py-3 px-4 font-medium text-foreground">
                  Cambio
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Ingresos Habitaciones",
                  current: currentData.revenue.rooms,
                  previous: previousData.revenue.rooms,
                },
                {
                  name: "Ingresos F&B",
                  current: currentData.revenue.food,
                  previous: previousData.revenue.food,
                },
                {
                  name: "Ingresos Spa",
                  current: currentData.revenue.spa,
                  previous: previousData.revenue.spa,
                },
                {
                  name: "Costos Personal",
                  current: currentData.costs.staff,
                  previous: previousData.costs.staff,
                },
                {
                  name: "Utilidad Neta",
                  current: currentData.profit,
                  previous: previousData.profit,
                },
              ].map((row, index) => {
                const change = calculateChange(row.current, row.previous);
                return (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-4 text-foreground">{row.name}</td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">
                      ${row.current.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      ${row.previous.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={change >= 0 ? "text-success" : "text-error"}
                      >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { ChartBarBig, PieChart } from "lucide-react";
import {
  ChannelBaseData,
  ChannelChart,
  chartTypeEnum,
  ForecastChart,
  LeadHistogramChart,
  type Chart,
  type ChartContent,
} from "./types";

const radarSample: ChartContent = {
  type: chartTypeEnum.enum.RADAR,
  baseData: [
    {
      key: "edadPromedio",
      label: "Edad Promedio",
      unit: "años",
      maxValue: 70,
      description: "Edad promedio del segmento",
    },
    {
      key: "estanciaPromedio",
      label: "Estancia Promedio",
      unit: "noches",
      maxValue: 6,
      description: "Noches promedio por reserva",
    },
    {
      key: "gastoTotal",
      label: "Gasto Total",
      unit: "$",
      maxValue: 500,
      description: "Gasto total promedio por estancia",
    },
    {
      key: "satisfaccion",
      label: "Satisfacción",
      unit: "/5",
      maxValue: 5,
      description: "Score de satisfacción del huésped",
    },
    {
      key: "frecuenciaAnual",
      label: "Frecuencia Anual",
      unit: "visitas",
      maxValue: 10,
      description: "Número de visitas por año",
    },
    {
      key: "gastosExtras",
      label: "Gastos Extras",
      unit: "$",
      maxValue: 150,
      description: "Gasto en servicios adicionales",
    },
    {
      key: "lealtad",
      label: "Lealtad",
      unit: "/10",
      maxValue: 10,
      description: "Índice de lealtad a la marca",
    },
    {
      key: "recomendacion",
      label: "NPS",
      unit: "/10",
      maxValue: 10,
      description: "Net Promoter Score",
    },
    {
      key: "puntualidad",
      label: "Puntualidad",
      unit: "/10",
      maxValue: 10,
      description: "Índice de cumplimiento de horarios",
    },
    {
      key: "digitalizacion",
      label: "Adopción Digital",
      unit: "/10",
      maxValue: 10,
      description: "Uso de servicios digitales",
    },
  ],
};

const leadHistogram: LeadHistogramChart = {
  type: chartTypeEnum.enum.LEAD_HISTOGRAM,
  baseData: null,
};

const channelChart: ChannelChart = {
  type: chartTypeEnum.enum.CHANNEL_CHART,
  baseData: {
    monthly: {
      "Reserva Directa": {
        icon: "🏨",
        reservations: 320,
        revenue: 85600,
        avgRate: 267.5,
        commission: 0,
        conversionRate: 8.2,
        customerSatisfaction: 4.7,
        color: "#10b981",
      },
      "Booking.com": {
        icon: "🌐",
        reservations: 450,
        revenue: 112500,
        avgRate: 250,
        commission: 16875, // 15%
        conversionRate: 4.1,
        customerSatisfaction: 4.3,
        color: "#3b82f6",
      },
      "Expedia Group": {
        icon: "✈️",
        reservations: 280,
        revenue: 67200,
        avgRate: 240,
        commission: 13440, // 20%
        conversionRate: 3.8,
        customerSatisfaction: 4.1,
        color: "#ef4444",
      },
      Agoda: {
        icon: "🏖️",
        reservations: 195,
        revenue: 46800,
        avgRate: 240,
        commission: 8424, // 18%
        conversionRate: 3.5,
        customerSatisfaction: 4.2,
        color: "#f59e0b",
      },
      "Agencias Corporativas": {
        icon: "🏢",
        reservations: 150,
        revenue: 48000,
        avgRate: 320,
        commission: 4800, // 10%
        conversionRate: 12.5,
        customerSatisfaction: 4.5,
        color: "#8b5cf6",
      },
      Airbnb: {
        icon: "🏡",
        reservations: 85,
        revenue: 17850,
        avgRate: 210,
        commission: 5355, // 30%
        conversionRate: 2.8,
        customerSatisfaction: 4.4,
        color: "#ec4899",
      },
      "GDS (Amadeus/Sabre)": {
        icon: "🌍",
        reservations: 110,
        revenue: 35200,
        avgRate: 320,
        commission: 3520, // 10%
        conversionRate: 5.2,
        customerSatisfaction: 4.0,
        color: "#06b6d4",
      },
      "Otros Canales": {
        icon: "📱",
        reservations: 75,
        revenue: 15750,
        avgRate: 210,
        commission: 2362.5, // 15%
        conversionRate: 2.1,
        customerSatisfaction: 3.9,
        color: "#84cc16",
      },
    },
  },
};

const forecastChart: ForecastChart = {
  type: chartTypeEnum.enum.OCUPATION_FORECAST,
  baseData: null,
};

export const chartCatalog = [
  {
    id: "guest-profile-radar",
    name: "Análisis de segmentos de clientes",
    description: "Comparasión multidimensional de segmentos de clientes",
    status: "Active",
    helpText: { primary: "8 Segmentos" },
    icon: <PieChart className="h-5 w-5" />,
    color: "chart-1",
    preview: "radar",
    content: radarSample,
  },
  {
    id: "lead-histogram",
    name: "Hisrograma de clientes",
    description: "Visualiza el hisrograma de clientes",
    status: "Active",
    helpText: { primary: "8 Segmentos" },
    icon: <ChartBarBig className="h-5 w-5" />,
    color: "chart-1",
    preview: "radar",
    content: leadHistogram,
  },
  {
    id: "channel-ranking-chart",
    name: "Ranking de canales",
    description: "Obtenga información acerca de canales de reservación y OTAs",
    status: "Active",
    helpText: { primary: "8 Segmentos" },
    icon: <ChartBarBig className="h-5 w-5" />,
    color: "chart-1",
    preview: "radar",
    content: channelChart,
  },
  {
    id: "occupation-forecast",
    name: "Estimación de ocupación",
    description: "Conozca la ocupación de habitaciones estimada",
    status: "Active",
    helpText: { primary: "8 Segmentos" },
    icon: <ChartBarBig className="h-5 w-5" />,
    color: "chart-1",
    preview: "radar",
    content: forecastChart,
  },
] as Chart[];

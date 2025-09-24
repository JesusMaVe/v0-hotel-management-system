import z from "zod";

export const chartTypeEnum = z.enum([
  "RADAR",
  "BAR",
  "LEAD_HISTOGRAM",
  "CHANNEL_CHART",
  "OCUPATION_FORECAST",
]);
export type ChartType = z.infer<typeof chartTypeEnum>;

/*
  ================================================================
  ================  INICIA GRÁFICO DE RADAR  =====================
  ================================================================
*/
const radarChartDimensionSchema = z.object({
  key: z.string(),
  label: z.string(),
  unit: z.string(),
  maxValue: z.number(),
  description: z.string(),
});
export type RadarDimension = z.infer<typeof radarChartDimensionSchema>;

const radarChartSchema = z.object({
  type: z.literal(chartTypeEnum.enum.RADAR),
  baseData: radarChartDimensionSchema.array(),
});
export type RadarChart = z.infer<typeof radarChartSchema>;

/*
  ================================================================
  ================  INICIA GRÁFICO CHANNELS  =====================
  ================================================================
*/

export const channelDataSchema = z.object({
  icon: z.any(),
  reservations: z.number(),
  revenue: z.number(),
  avgRate: z.number(),
  commission: z.number(),
  conversionRate: z.number(),
  customerSatisfaction: z.number(),
  color: z.string(),
});

export const channelBaseDataSchema = z.object({
  monthly: z.record(z.string(), channelDataSchema),
});

export type ChannelBaseData = z.infer<typeof channelBaseDataSchema>;

const channelChartSchema = z.object({
  type: z.literal(chartTypeEnum.enum.CHANNEL_CHART),
  baseData: channelBaseDataSchema,
});
export type ChannelChart = z.infer<typeof channelChartSchema>;

/*
  ================================================================
  ============  INICIA GRÁFICO LEAD HISTOGRAM   ==================
  ================================================================
*/

const leadHistogramSchema = z.object({
  type: z.literal(chartTypeEnum.enum.LEAD_HISTOGRAM),
  baseData: z.null(),
});
export type LeadHistogramChart = z.infer<typeof leadHistogramSchema>;

/*
  ================================================================
  ============  INICIA GRÁFICO FORECAST   ==================
  ================================================================
*/

const forecastSchema = z.object({
  type: z.literal(chartTypeEnum.enum.OCUPATION_FORECAST),
  baseData: z.null(),
});
export type ForecastChart = z.infer<typeof forecastSchema>;

/*
  ================================================================
  =========   ESQUEMA POLIMÓRFICO Y TIPADO FINAL    ==============
  ================================================================
*/

const chartContentSchema = z.discriminatedUnion("type", [
  radarChartSchema,
  leadHistogramSchema,
  channelChartSchema,
  forecastSchema,
]);
export type ChartContent = z.infer<typeof chartContentSchema>;

const chartSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  helpText: z.object({
    primary: z.string(),
    secondary: z.string().nullish(),
  }),
  icon: z.any(),
  color: z.string(),
  preview: z.string(),
  content: chartContentSchema,
});

export type Chart = z.infer<typeof chartSchema>;

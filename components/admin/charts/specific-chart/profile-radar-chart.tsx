import { useMemo, useState } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { RadarDimension } from "@/lib/charts/types";

type GuestSegmentData = {
  edadPromedio: number;
  estanciaPromedio: number;
  gastoTotal: number;
  satisfaccion: number;
  frecuenciaAnual: number;
  gastosExtras: number;
  lealtad: number;
  recomendacion: number;
  puntualidad: number;
  digitalizacion: number;
};

type GuestSegment = {
  color: string;
  icon: string;
  data: GuestSegmentData;
};
type GuestSegmentRecord = Record<string, GuestSegment>;

const guestSegments: GuestSegmentRecord = {
  "VIP Corporativo": {
    color: "#dc2626",
    icon: "💼",
    data: {
      edadPromedio: 42,
      estanciaPromedio: 2.1,
      gastoTotal: 450,
      satisfaccion: 4.6,
      frecuenciaAnual: 8.5,
      gastosExtras: 85,
      lealtad: 9.2,
      recomendacion: 8.8,
      puntualidad: 9.5,
      digitalizacion: 7.8,
    },
  },
  "Leisure Premium": {
    color: "#3b82f6",
    icon: "🏖️",
    data: {
      edadPromedio: 38,
      estanciaPromedio: 4.2,
      gastoTotal: 320,
      satisfaccion: 4.4,
      frecuenciaAnual: 2.3,
      gastosExtras: 120,
      lealtad: 7.1,
      recomendacion: 8.2,
      puntualidad: 8.1,
      digitalizacion: 8.9,
    },
  },
  Familias: {
    color: "#10b981",
    icon: "👨‍👩‍👧‍👦",
    data: {
      edadPromedio: 35,
      estanciaPromedio: 3.8,
      gastoTotal: 280,
      satisfaccion: 4.2,
      frecuenciaAnual: 1.8,
      gastosExtras: 95,
      lealtad: 6.8,
      recomendacion: 7.9,
      puntualidad: 7.5,
      digitalizacion: 8.2,
    },
  },
  "Millennials Solo": {
    color: "#f59e0b",
    icon: "🎒",
    data: {
      edadPromedio: 28,
      estanciaPromedio: 2.5,
      gastoTotal: 180,
      satisfaccion: 4.0,
      frecuenciaAnual: 3.2,
      gastosExtras: 60,
      lealtad: 5.5,
      recomendacion: 7.2,
      puntualidad: 6.8,
      digitalizacion: 9.5,
    },
  },
  "Seniors Leisure": {
    color: "#8b5cf6",
    icon: "🧳",
    data: {
      edadPromedio: 62,
      estanciaPromedio: 5.1,
      gastoTotal: 380,
      satisfaccion: 4.7,
      frecuenciaAnual: 2.1,
      gastosExtras: 110,
      lealtad: 8.9,
      recomendacion: 9.1,
      puntualidad: 9.2,
      digitalizacion: 5.2,
    },
  },
  "Grupos Corporativos": {
    color: "#06b6d4",
    icon: "🏢",
    data: {
      edadPromedio: 40,
      estanciaPromedio: 1.8,
      gastoTotal: 220,
      satisfaccion: 4.1,
      frecuenciaAnual: 4.5,
      gastosExtras: 45,
      lealtad: 7.8,
      recomendacion: 7.5,
      puntualidad: 9.1,
      digitalizacion: 8.1,
    },
  },
  "Budget Travelers": {
    color: "#84cc16",
    icon: "🎯",
    data: {
      edadPromedio: 31,
      estanciaPromedio: 1.9,
      gastoTotal: 120,
      satisfaccion: 3.8,
      frecuenciaAnual: 1.2,
      gastosExtras: 25,
      lealtad: 4.2,
      recomendacion: 6.8,
      puntualidad: 7.2,
      digitalizacion: 8.7,
    },
  },
  "Parejas Románticas": {
    color: "#ec4899",
    icon: "💕",
    data: {
      edadPromedio: 33,
      estanciaPromedio: 3.2,
      gastoTotal: 350,
      satisfaccion: 4.5,
      frecuenciaAnual: 1.5,
      gastosExtras: 140,
      lealtad: 7.5,
      recomendacion: 8.5,
      puntualidad: 8.3,
      digitalizacion: 8.0,
    },
  },
};

export const ProfileRadarChart = ({
  radarDimensions,
}: {
  radarDimensions: RadarDimension[];
}) => {
  const [selectedSegments, setSelectedSegments] = useState([
    "VIP Corporativo",
    "Leisure Premium",
  ]);
  const [viewMode, setViewMode] = useState("normalized"); // 'normalized' o 'absolute'
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly");

  // Normalizar datos para el radar chart
  const normalizeData = (segments: string[]) => {
    return radarDimensions.map((dimension) => {
      const dataPoint = {
        dimension: dimension.label,
        fullMark: 100,
        unit: dimension.unit,
        description: dimension.description,
      };

      segments.forEach((segmentName) => {
        if (guestSegments[segmentName]) {
          const rawValue =
            guestSegments[segmentName].data[
              dimension.key as keyof GuestSegmentData
            ];
          const normalizedValue =
            viewMode === "normalized"
              ? (rawValue / dimension.maxValue) * 100
              : rawValue;
          dataPoint[segmentName] = normalizedValue;
        }
      });

      return dataPoint;
    });
  };

  const radarData = useMemo(() => {
    return normalizeData(selectedSegments);
  }, [selectedSegments, viewMode]);

  // Tooltip personalizado
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: any;
    payload: {
      dataKey: any;
      color: any;
      value: any;
    }[];
    label: string;
  }) => {
    if (active && payload && payload.length > 0) {
      const dimension = radarDimensions.find((d) => d.label === label);

      return (
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-xl">
          <h4 className="mb-2 font-semibold text-gray-800">{label}</h4>
          <p className="mb-3 text-xs text-gray-600">{dimension?.description}</p>

          <div className="space-y-2">
            {payload.map((entry, index) => {
              const segment = guestSegments[entry.dataKey];
              const rawValue = segment ? segment.data[dimension?.key] : 0;

              return (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{segment?.icon}</span>
                      <span className="text-sm font-medium">
                        {entry.dataKey}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {viewMode === "normalized" ? (
                        <>
                          Valor: {rawValue}
                          {dimension?.unit} ({entry.value.toFixed(1)}%)
                        </>
                      ) : (
                        <>
                          Valor: {entry.value.toFixed(1)}
                          {dimension?.unit}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calcular estadísticas comparativas
  const comparisonStats = useMemo(() => {
    if (selectedSegments.length !== 2) return null;

    const [segment1, segment2] = selectedSegments;
    const data1 = guestSegments[segment1]?.data;
    const data2 = guestSegments[segment2]?.data;

    if (!data1 || !data2) return null;

    const differences = {};
    Object.keys(data1).forEach((key) => {
      const diff = ((data2[key] - data1[key]) / data1[key]) * 100;
      differences[key] = {
        value1: data1[key],
        value2: data2[key],
        difference: diff,
        dimension: radarDimensions.find((d) => d.key === key),
      };
    });

    return {
      segment1,
      segment2,
      differences,
    };
  }, [selectedSegments]);

  const segmentOptions = Object.keys(guestSegments);
  const maxSelections = 4;

  const handleSegmentToggle = (segment) => {
    if (selectedSegments.includes(segment)) {
      setSelectedSegments((prev) => prev.filter((s) => s !== segment));
    } else if (selectedSegments.length < maxSelections) {
      setSelectedSegments((prev) => [...prev, segment]);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="bg-red-600 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="mb-1 text-xl font-bold text-white">
              Perfil de Huéspedes - Análisis Radar
            </h2>
            <p className="text-sm text-white">
              Comparación multidimensional de segmentos de huéspedes
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                setViewMode(
                  viewMode === "normalized" ? "absolute" : "normalized",
                )
              }
              className={`rounded px-3 py-1 text-sm font-medium transition-all ${
                viewMode === "normalized"
                  ? "bg-white text-black-600"
                  : "bg-black-500 text-white hover:bg-black-400"
              }`}
            >
              {viewMode === "normalized"
                ? "Vista Normalizada"
                : "Valores Absolutos"}
            </button>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded bg-white px-3 py-1 text-sm font-medium text-black-600"
            >
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Selector de segmentos */}
      <div className="bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold text-gray-800">
          Seleccionar Segmentos (máximo {maxSelections})
        </h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {segmentOptions.map((segment) => {
            const isSelected = selectedSegments.includes(segment);
            const isDisabled =
              !isSelected && selectedSegments.length >= maxSelections;

            return (
              <button
                key={segment}
                onClick={() => handleSegmentToggle(segment)}
                disabled={isDisabled}
                className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium transition-all ${
                  isSelected
                    ? "text-white ring-2"
                    : isDisabled
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: isSelected
                    ? guestSegments[segment].color
                    : undefined,
                  ringColor: isSelected
                    ? guestSegments[segment].color
                    : undefined,
                }}
              >
                <span className="text-lg">{guestSegments[segment].icon}</span>
                <span className="text-xs">{segment}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart
            data={radarData}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          >
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fontSize: 12, fill: "#374151" }}
              className="text-xs"
            />
            <PolarRadiusAxis
              angle={90}
              domain={viewMode === "normalized" ? [0, 100] : "auto"}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickFormatter={(value) =>
                viewMode === "normalized" ? `${value}%` : value.toString()
              }
            />

            <Tooltip content={<CustomTooltip />} />

            {selectedSegments.map((segmentName, index) => (
              <Radar
                key={segmentName}
                name={segmentName}
                dataKey={segmentName}
                stroke={guestSegments[segmentName].color}
                fill={guestSegments[segmentName].color}
                fillOpacity={0.1 + index * 0.1}
                strokeWidth={2}
                dot={{
                  fill: guestSegments[segmentName].color,
                  strokeWidth: 1,
                  r: 4,
                }}
              />
            ))}

            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="flex items-center gap-1">
                  <span>{guestSegments[value]?.icon}</span>
                  <span className="text-sm">{value}</span>
                </span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Análisis comparativo (solo para 2 segmentos) */}
      {comparisonStats && (
        <div className="bg-gray-50 p-4">
          <h3 className="mb-4 font-semibold text-gray-800">
            Análisis Comparativo: {comparisonStats.segment1} vs{" "}
            {comparisonStats.segment2}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(comparisonStats.differences)
              .filter(([_, data]) => Math.abs(data.difference) > 5) // Solo mostrar diferencias significativas
              .sort(
                (a, b) => Math.abs(b[1].difference) - Math.abs(a[1].difference),
              )
              .slice(0, 6)
              .map(([key, data]) => (
                <div key={key} className="rounded-lg bg-white p-3 shadow-sm">
                  <h4 className="mb-2 text-sm font-medium text-gray-800">
                    {data.dimension?.label}
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {comparisonStats.segment1}:
                      </span>
                      <span className="font-medium">
                        {data.value1.toFixed(1)}
                        {data.dimension?.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {comparisonStats.segment2}:
                      </span>
                      <span className="font-medium">
                        {data.value2.toFixed(1)}
                        {data.dimension?.unit}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-1">
                      <span className="text-gray-600">Diferencia:</span>
                      <span
                        className={`font-bold ${data.difference > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {data.difference > 0 ? "+" : ""}
                        {data.difference.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Resumen de segmentos seleccionados */}
      <div className="bg-gray-50 p-4">
        <h3 className="mb-4 font-semibold text-gray-800">
          Resumen de Segmentos Seleccionados
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedSegments.map((segmentName) => {
            const segment = guestSegments[segmentName];
            return (
              <div
                key={segmentName}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">{segment.icon}</span>
                  <h4 className="font-semibold text-gray-800">{segmentName}</h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ color: segment.color }}
                    >
                      {segment.data.edadPromedio}
                    </p>
                    <p className="text-gray-600">años promedio</p>
                  </div>
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ color: segment.color }}
                    >
                      ${segment.data.gastoTotal}
                    </p>
                    <p className="text-gray-600">gasto total</p>
                  </div>
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ color: segment.color }}
                    >
                      {segment.data.satisfaccion}/5
                    </p>
                    <p className="text-gray-600">satisfacción</p>
                  </div>
                  <div className="rounded bg-gray-50 p-2 text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ color: segment.color }}
                    >
                      {segment.data.frecuenciaAnual}
                    </p>
                    <p className="text-gray-600">visitas/año</p>
                  </div>
                </div>

                <div className="mt-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lealtad:</span>
                    <span className="font-medium">
                      {segment.data.lealtad}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NPS:</span>
                    <span className="font-medium">
                      {segment.data.recomendacion}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Digital:</span>
                    <span className="font-medium">
                      {segment.data.digitalizacion}/10
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights estratégicos */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-800">
              🎯 Segmento Más Rentable
            </h4>
            <div className="text-sm">
              {(() => {
                const mostProfitable = selectedSegments.reduce(
                  (best, current) => {
                    const currentValue =
                      guestSegments[current].data.gastoTotal *
                      guestSegments[current].data.frecuenciaAnual;
                    const bestValue =
                      guestSegments[best].data.gastoTotal *
                      guestSegments[best].data.frecuenciaAnual;
                    return currentValue > bestValue ? current : best;
                  },
                );
                const segment = guestSegments[mostProfitable];
                const annualValue =
                  segment.data.gastoTotal * segment.data.frecuenciaAnual;

                return (
                  <>
                    <p className="flex items-center gap-1 font-medium text-green-700">
                      <span>{segment.icon}</span>
                      {mostProfitable}
                    </p>
                    <p className="text-green-600">
                      ${annualValue.toFixed(0)} valor anual
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
              ⭐ Mayor Satisfacción
            </h4>
            <div className="text-sm">
              {(() => {
                const mostSatisfied = selectedSegments.reduce(
                  (best, current) =>
                    guestSegments[current].data.satisfaccion >
                    guestSegments[best].data.satisfaccion
                      ? current
                      : best,
                );
                const segment = guestSegments[mostSatisfied];

                return (
                  <>
                    <p className="flex items-center gap-1 font-medium text-blue-700">
                      <span>{segment.icon}</span>
                      {mostSatisfied}
                    </p>
                    <p className="text-blue-600">
                      {segment.data.satisfaccion}/5.0 satisfacción
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="rounded-lg bg-black-50 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-black-800">
              🔄 Mayor Lealtad
            </h4>
            <div className="text-sm">
              {(() => {
                const mostLoyal = selectedSegments.reduce((best, current) =>
                  guestSegments[current].data.lealtad >
                  guestSegments[best].data.lealtad
                    ? current
                    : best,
                );
                const segment = guestSegments[mostLoyal];

                return (
                  <>
                    <p className="flex items-center gap-1 font-medium text-black-700">
                      <span>{segment.icon}</span>
                      {mostLoyal}
                    </p>
                    <p className="text-black-600">
                      {segment.data.lealtad}/10 lealtad
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

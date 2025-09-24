import React, { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export const RoomOccupationForecast = () => {
  const [forecastPeriod, setForecastPeriod] = useState(30);
  const [showScenarios, setShowScenarios] = useState(true);

  // Generar datos históricos y forecast
  const generateForecastData = (days) => {
    const data = [];
    const today = new Date();
    const totalRooms = 250;
    const avgRoomRate = 180; // Tarifa promedio por habitación

    // Datos históricos (últimos 14 días)
    for (let i = -14; i < 0; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Patrón de ocupación histórico realista
      const baseOccupancy = 75 + Math.sin(i * 0.2) * 10; // Patrón base con variación
      const weekendEffect = date.getDay() === 5 || date.getDay() === 6 ? 8 : -3;
      const seasonalEffect = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 5;
      const randomNoise = (Math.random() - 0.5) * 8;

      const occupancyRate = Math.max(
        45,
        Math.min(
          95,
          baseOccupancy + weekendEffect + seasonalEffect + randomNoise,
        ),
      );

      const occupiedRooms = Math.round((occupancyRate / 100) * totalRooms);
      const revenue = occupiedRooms * avgRoomRate * (0.9 + Math.random() * 0.2);

      data.push({
        date: date.toISOString().split("T")[0],
        dateLabel: date.toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        }),
        dayType: "historical",
        occupancyRate: Math.round(occupancyRate * 10) / 10,
        occupiedRooms,
        revenue: Math.round(revenue),
        // Para forecast (null en históricos)
        forecastBase: null,
        confidenceUpper: null,
        confidenceLower: null,
        optimistic: null,
        pessimistic: null,
        realistic: null,
      });
    }

    // Datos actuales (hoy)
    const currentOccupancy = 78.5;
    const currentRooms = Math.round((currentOccupancy / 100) * totalRooms);
    const currentRevenue = currentRooms * avgRoomRate;

    data.push({
      date: today.toISOString().split("T")[0],
      dateLabel: "Hoy",
      dayType: "current",
      occupancyRate: currentOccupancy,
      occupiedRooms: currentRooms,
      revenue: currentRevenue,
      forecastBase: currentOccupancy,
      confidenceUpper: currentOccupancy + 3,
      confidenceLower: currentOccupancy - 3,
      optimistic: currentOccupancy + 5,
      pessimistic: currentOccupancy - 5,
      realistic: currentOccupancy,
    });

    // Predicciones futuras
    let trendBase = currentOccupancy;
    for (let i = 1; i <= days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Factores que afectan la predicción
      const seasonalTrend =
        Math.sin(((date.getMonth() + date.getDate() / 30) / 12) * 2 * Math.PI) *
        8;
      const weekdayPattern =
        date.getDay() === 5 || date.getDay() === 6
          ? 12
          : date.getDay() === 0
            ? -8
            : date.getDay() >= 1 && date.getDay() <= 4
              ? 3
              : 0;

      // Eventos especiales simulados
      const specialEvents = getSpecialEvents(date, i);
      const eventImpact = specialEvents.impact;

      // Tendencia de reservas (decrece conforme aumenta el lead time)
      const bookingTrend = Math.max(-5, -0.3 * i + 2);

      // Incertidumbre aumenta con el tiempo
      const uncertainty = Math.min(25, 5 + i * 0.4);

      // Predicción base
      trendBase += (Math.random() - 0.5) * 1; // Pequeña deriva aleatoria
      const baseForecast = Math.max(
        40,
        Math.min(
          95,
          trendBase +
            seasonalTrend +
            weekdayPattern +
            eventImpact +
            bookingTrend,
        ),
      );

      // Intervalos de confianza (95%)
      const confidenceInterval = uncertainty;
      const optimisticBoost = uncertainty * 0.8;
      const pessimisticDrop = uncertainty * 1.2;

      const occupancyRate = Math.round(baseForecast * 10) / 10;
      const occupiedRooms = Math.round((occupancyRate / 100) * totalRooms);
      const revenue =
        occupiedRooms * avgRoomRate * (0.95 + Math.random() * 0.1);

      data.push({
        date: date.toISOString().split("T")[0],
        dateLabel: date.toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        }),
        dayType: "forecast",
        dayOfWeek: date.getDay(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        specialEvent: specialEvents.name,
        // Valores principales
        occupancyRate,
        occupiedRooms,
        revenue: Math.round(revenue),
        // Líneas de forecast
        forecastBase: occupancyRate,
        confidenceUpper: Math.min(98, occupancyRate + confidenceInterval),
        confidenceLower: Math.max(30, occupancyRate - confidenceInterval),
        optimistic: Math.min(98, occupancyRate + optimisticBoost),
        pessimistic: Math.max(30, occupancyRate - pessimisticDrop),
        realistic: occupancyRate,
        // Métricas adicionales
        uncertainty: Math.round(uncertainty),
        daysAhead: i,
      });
    }

    return data;
  };

  // Eventos especiales que afectan la demanda
  const getSpecialEvents = (date, daysAhead) => {
    const month = date.getMonth();
    const day = date.getDate();

    // Temporada alta (verano)
    if (month >= 5 && month <= 7) {
      return { name: "Temporada Alta", impact: 8 };
    }

    // Fiestas navideñas
    if (month === 11 && day >= 20) {
      return { name: "Fiestas Navideñas", impact: 15 };
    }

    // Eventos corporativos simulados
    if (daysAhead % 20 === 0) {
      return { name: "Convención Corporativa", impact: 20 };
    }

    // Eventos culturales
    if (daysAhead % 35 === 0) {
      return { name: "Festival Cultural", impact: 12 };
    }

    return { name: null, impact: 0 };
  };

  const data = useMemo(
    () => generateForecastData(forecastPeriod),
    [forecastPeriod],
  );

  // Separar datos históricos y forecast
  const historicalData = data.filter(
    (d) => d.dayType === "historical" || d.dayType === "current",
  );
  const forecastData = data.filter(
    (d) => d.dayType === "current" || d.dayType === "forecast",
  );

  // Calcular estadísticas
  const stats = useMemo(() => {
    const futureData = data.filter((d) => d.dayType === "forecast");
    const historical = data.filter((d) => d.dayType === "historical");

    const avgForecast =
      futureData.reduce((sum, d) => sum + d.occupancyRate, 0) /
      futureData.length;
    const avgHistorical =
      historical.reduce((sum, d) => sum + d.occupancyRate, 0) /
      historical.length;

    const maxForecast = Math.max(...futureData.map((d) => d.optimistic));
    const minForecast = Math.min(...futureData.map((d) => d.pessimistic));

    const peakDays = futureData.filter((d) => d.occupancyRate >= 85).length;
    const lowDays = futureData.filter((d) => d.occupancyRate < 60).length;

    return {
      avgForecast: avgForecast.toFixed(1),
      avgHistorical: avgHistorical.toFixed(1),
      maxForecast: maxForecast.toFixed(1),
      minForecast: minForecast.toFixed(1),
      peakDays,
      lowDays,
      totalForecastDays: futureData.length,
      trend: avgForecast > avgHistorical ? "up" : "down",
      trendDiff: Math.abs(avgForecast - avgHistorical).toFixed(1),
    };
  }, [data]);

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
          <h4 className="font-semibold text-gray-800 mb-2">
            {label}
            {data.dayType === "forecast" && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                +{data.daysAhead} días
              </span>
            )}
          </h4>

          <div className="space-y-1 text-sm">
            {data.dayType === "historical" ? (
              <>
                <p>
                  <span className="text-gray-600">Ocupación:</span>{" "}
                  <span className="font-bold text-blue-600">
                    {data.occupancyRate}%
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Habitaciones:</span>{" "}
                  <span className="font-medium">{data.occupiedRooms}/250</span>
                </p>
                <p>
                  <span className="text-gray-600">Revenue:</span>{" "}
                  <span className="font-medium">
                    ${data.revenue.toLocaleString()}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="text-gray-600">Predicción base:</span>{" "}
                  <span className="font-bold text-purple-600">
                    {data.forecastBase}%
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Rango confianza:</span>{" "}
                  <span className="font-medium">
                    {data.confidenceLower?.toFixed(1)}% -{" "}
                    {data.confidenceUpper?.toFixed(1)}%
                  </span>
                </p>

                {showScenarios && (
                  <div className="border-t pt-2 mt-2">
                    <p>
                      <span className="text-green-600">Optimista:</span>{" "}
                      <span className="font-medium">
                        {data.optimistic?.toFixed(1)}%
                      </span>
                    </p>
                    <p>
                      <span className="text-red-600">Pesimista:</span>{" "}
                      <span className="font-medium">
                        {data.pessimistic?.toFixed(1)}%
                      </span>
                    </p>
                  </div>
                )}

                {data.specialEvent && (
                  <p className="text-orange-600 text-xs mt-2">
                    🎪 {data.specialEvent}
                  </p>
                )}

                <p className="text-gray-500 text-xs mt-2">
                  Incertidumbre: ±{data.uncertainty}%
                </p>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const periodOptions = [
    { value: 30, label: "30 días" },
    { value: 60, label: "60 días" },
    { value: 90, label: "90 días" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Forecast de Demanda - Predicción de Ocupación
            </h2>
            <p className="text-indigo-100 text-sm">
              Análisis predictivo con intervalos de confianza y escenarios
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setForecastPeriod(option.value)}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                  forecastPeriod === option.value
                    ? "bg-white text-indigo-600 shadow-md"
                    : "bg-indigo-500 text-white hover:bg-indigo-400"
                }`}
              >
                {option.label}
              </button>
            ))}

            <button
              onClick={() => setShowScenarios(!showScenarios)}
              className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                showScenarios
                  ? "bg-yellow-400 text-indigo-800"
                  : "bg-indigo-500 text-white hover:bg-indigo-400"
              }`}
            >
              Escenarios
            </button>
          </div>
        </div>
      </div>

      {/* KPIs de forecast */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50">
        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">
            {stats.avgForecast}%
          </p>
          <p className="text-xs text-gray-600">Ocupación Promedio</p>
          <p className="text-xs text-gray-500">
            Próximos {forecastPeriod} días
          </p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p
            className={`text-2xl font-bold ${stats.trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {stats.trend === "up" ? "↗" : "↘"} {stats.trendDiff}%
          </p>
          <p className="text-xs text-gray-600">Tendencia</p>
          <p className="text-xs text-gray-500">vs Histórico</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-green-600">
            {stats.maxForecast}%
          </p>
          <p className="text-xs text-gray-600">Pico Optimista</p>
          <p className="text-xs text-gray-500">Máximo esperado</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-orange-600">{stats.peakDays}</p>
          <p className="text-xs text-gray-600">Días Pico</p>
          <p className="text-xs text-gray-500">≥85% ocupación</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.lowDays}</p>
          <p className="text-xs text-gray-600">Días Bajos</p>
          <p className="text-xs text-gray-500">&lt;60% ocupación</p>
        </div>
      </div>

      {/* Gráfico principal */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 11, angle: -45, textAnchor: "end" }}
              height={60}
              interval={Math.max(1, Math.floor(data.length / 15))}
            />

            <YAxis
              domain={[20, 100]}
              tick={{ fontSize: 12 }}
              label={{
                value: "Ocupación (%)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Línea divisoria - Hoy */}
            <ReferenceLine
              x="Hoy"
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{ value: "Hoy", position: "topRight" }}
            />

            {/* Línea objetivo */}
            <ReferenceLine
              y={75}
              stroke="#10b981"
              strokeDasharray="2 2"
              label={{ value: "Objetivo 75%", position: "topLeft" }}
            />

            {/* Banda de confianza */}
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="none"
              fill="rgba(139, 92, 246, 0.1)"
              stackId="confidence"
            />
            <Area
              type="monotone"
              dataKey="confidenceLower"
              stroke="none"
              fill="rgba(255, 255, 255, 0.9)"
              stackId="confidence"
            />

            {/* Escenarios (si están activados) */}
            {showScenarios && (
              <>
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#10b981"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  fill="none"
                  name="Escenario Optimista"
                />
                <Area
                  type="monotone"
                  dataKey="pessimistic"
                  stroke="#ef4444"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  fill="none"
                  name="Escenario Pesimista"
                />
              </>
            )}

            {/* Línea principal de forecast */}
            <Area
              type="monotone"
              dataKey="forecastBase"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="none"
              name="Predicción Base"
              connectNulls={false}
            />

            {/* Datos históricos */}
            <Area
              type="monotone"
              dataKey="occupancyRate"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="rgba(59, 130, 246, 0.2)"
              name="Datos Históricos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Panel de insights */}
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              📈 Análisis de Tendencia
            </h4>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-600">Dirección:</span>
                <span
                  className={`ml-2 font-medium ${stats.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {stats.trend === "up" ? "Creciente" : "Decreciente"}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Variación vs histórico:</span>
                <span className="ml-2 font-medium">{stats.trendDiff}%</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Basado en patrones estacionales, eventos y tendencias de reserva
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              🎯 Objetivos de Performance
            </h4>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-600">Meta ocupación:</span>
                <span className="ml-2 font-medium text-green-600">75%</span>
              </p>
              <p>
                <span className="text-gray-600">Días sobre meta:</span>
                <span className="ml-2 font-medium">
                  {
                    data.filter(
                      (d) => d.dayType === "forecast" && d.occupancyRate >= 75,
                    ).length
                  }
                  /{stats.totalForecastDays}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {Math.round(
                  (data.filter(
                    (d) => d.dayType === "forecast" && d.occupancyRate >= 75,
                  ).length /
                    stats.totalForecastDays) *
                    100,
                )}
                % del período en objetivo
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              ⚠️ Alertas y Recomendaciones
            </h4>
            <div className="text-sm space-y-1">
              {stats.lowDays > 0 && (
                <p className="text-orange-600">
                  • {stats.lowDays} días con ocupación baja
                </p>
              )}
              {stats.peakDays > 0 && (
                <p className="text-green-600">
                  • {stats.peakDays} días de alta demanda
                </p>
              )}
              <p className="text-blue-600">
                • Rango de confianza: {stats.minForecast}% - {stats.maxForecast}
                %
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Ajustar pricing dinámico según predicciones
              </p>
            </div>
          </div>
        </div>

        {/* Leyenda detallada */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-blue-500 rounded"></div>
            <span>Datos Históricos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-purple-600 rounded"></div>
            <span>Predicción Base</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-purple-200 rounded"></div>
            <span>Banda de Confianza 95%</span>
          </div>
          {showScenarios && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 border-2 border-dashed border-green-500 rounded"></div>
                <span>Escenario Optimista</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 border-2 border-dashed border-red-500 rounded"></div>
                <span>Escenario Pesimista</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

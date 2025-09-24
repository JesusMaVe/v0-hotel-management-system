import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

export const LeadTimeHistogram = () => {
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [binSize, setBinSize] = useState(7); // Días por bin
  const [selectedSeason, setSelectedSeason] = useState("all");

  // Generar datos de lead time realistas
  const generateLeadTimeData = () => {
    const data = [];
    const segments = ["Corporativo", "Leisure", "Grupos", "Last Minute"];
    const channels = [
      "Reserva Directa",
      "Booking.com",
      "Expedia",
      "Agencias",
      "Otros",
    ];
    const seasons = ["Baja", "Media", "Alta", "Especial"];

    // Patrones de lead time por segmento
    const leadTimePatterns = {
      Corporativo: { mean: 14, std: 8, min: 0, max: 60 },
      Leisure: { mean: 35, std: 25, min: 0, max: 120 },
      Grupos: { mean: 90, std: 45, min: 30, max: 365 },
      "Last Minute": { mean: 3, std: 3, min: 0, max: 14 },
    };

    const channelModifiers = {
      "Reserva Directa": 1.2,
      "Booking.com": 0.9,
      Expedia: 0.8,
      Agencias: 1.5,
      Otros: 1.0,
    };

    const seasonalModifiers = {
      Baja: 0.7,
      Media: 1.0,
      Alta: 1.4,
      Especial: 2.0,
    };

    // Generar 5000 reservas de muestra
    for (let i = 0; i < 5000; i++) {
      const segment = segments[Math.floor(Math.random() * segments.length)];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      const season = seasons[Math.floor(Math.random() * seasons.length)];

      const pattern = leadTimePatterns[segment];
      const channelMod = channelModifiers[channel];
      const seasonMod = seasonalModifiers[season];

      // Generar lead time usando distribución normal modificada
      let leadTime = generateNormalRandom(
        pattern.mean * channelMod * seasonMod,
        pattern.std,
      );
      leadTime = Math.max(
        pattern.min,
        Math.min(pattern.max, Math.round(leadTime)),
      );

      // Datos adicionales para análisis
      const roomRate =
        150 +
        (leadTime > 30 ? -20 : leadTime < 7 ? 40 : 0) +
        (Math.random() - 0.5) * 60;
      const stayLength = Math.max(1, Math.round(2 + (Math.random() - 0.5) * 2));

      data.push({
        id: i + 1,
        leadTime,
        segment,
        channel,
        season,
        roomRate: Math.round(roomRate),
        stayLength,
        totalValue: Math.round(roomRate * stayLength),
        isLastMinute: leadTime <= 7,
        isEarlyBird: leadTime >= 60,
        pricingCategory:
          leadTime <= 7
            ? "Last Minute"
            : leadTime <= 14
              ? "Short Term"
              : leadTime <= 30
                ? "Medium Term"
                : leadTime <= 60
                  ? "Long Term"
                  : "Early Bird",
      });
    }

    return data;
  };

  // Función para generar números aleatorios con distribución normal
  const generateNormalRandom = (mean, std) => {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * std + mean;
  };

  const allReservations = useMemo(() => generateLeadTimeData(), []);

  // Filtrar datos según selecciones
  const filteredData = useMemo(() => {
    return allReservations.filter((reservation) => {
      if (selectedSegment !== "all" && reservation.segment !== selectedSegment)
        return false;
      if (selectedChannel !== "all" && reservation.channel !== selectedChannel)
        return false;
      if (selectedSeason !== "all" && reservation.season !== selectedSeason)
        return false;
      return true;
    });
  }, [allReservations, selectedSegment, selectedChannel, selectedSeason]);

  // Crear bins para el histograma
  const histogramData = useMemo(() => {
    const maxLeadTime = Math.max(...filteredData.map((d) => d.leadTime));
    const bins = [];

    // Crear bins dinámicos
    for (let i = 0; i <= maxLeadTime + binSize; i += binSize) {
      const binStart = i;
      const binEnd = i + binSize - 1;

      const reservationsInBin = filteredData.filter(
        (d) => d.leadTime >= binStart && d.leadTime <= binEnd,
      );

      if (reservationsInBin.length > 0 || i < 120) {
        // Mostrar hasta 120 días aunque esté vacío
        const avgRate =
          reservationsInBin.length > 0
            ? reservationsInBin.reduce((sum, r) => sum + r.roomRate, 0) /
              reservationsInBin.length
            : 0;

        const avgValue =
          reservationsInBin.length > 0
            ? reservationsInBin.reduce((sum, r) => sum + r.totalValue, 0) /
              reservationsInBin.length
            : 0;

        bins.push({
          binStart,
          binEnd,
          binLabel: binSize === 1 ? `${binStart}` : `${binStart}-${binEnd}`,
          binCenter: binStart + binSize / 2,
          count: reservationsInBin.length,
          percentage: (reservationsInBin.length / filteredData.length) * 100,
          avgRoomRate: Math.round(avgRate),
          avgTotalValue: Math.round(avgValue),
          cumulativeCount: 0, // Se calculará después
          cumulativePercentage: 0, // Se calculará después
          reservations: reservationsInBin,
        });
      }
    }

    // Calcular acumulados
    let cumulative = 0;
    bins.forEach((bin) => {
      cumulative += bin.count;
      bin.cumulativeCount = cumulative;
      bin.cumulativePercentage = (cumulative / filteredData.length) * 100;
    });

    return bins.filter((bin) => bin.binStart <= 120); // Limitar a 120 días para visualización
  }, [filteredData, binSize]);

  // Función para obtener color del bin según lead time
  const getBinColor = (binStart) => {
    if (binStart <= 7) return "#ef4444"; // Rojo - Last minute
    if (binStart <= 14) return "#f97316"; // Naranja - Short term
    if (binStart <= 30) return "#eab308"; // Amarillo - Medium term
    if (binStart <= 60) return "#22c55e"; // Verde - Long term
    return "#3b82f6"; // Azul - Early bird
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
          <h4 className="font-semibold text-gray-800 mb-2">
            Lead Time: {data.binLabel} días
          </h4>

          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="text-gray-600">Reservas:</span>{" "}
                  <span className="font-bold text-blue-600">
                    {data.count.toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Porcentaje:</span>{" "}
                  <span className="font-medium">
                    {data.percentage.toFixed(1)}%
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Acumulado:</span>{" "}
                  <span className="font-medium">
                    {data.cumulativePercentage.toFixed(1)}%
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-gray-600">Tarifa prom:</span>{" "}
                  <span className="font-medium text-green-600">
                    ${data.avgRoomRate}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Valor prom:</span>{" "}
                  <span className="font-medium text-purple-600">
                    ${data.avgTotalValue}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <p className="text-xs text-gray-500">
                Categoría:{" "}
                {data.binStart <= 7
                  ? "Last Minute"
                  : data.binStart <= 14
                    ? "Corto Plazo"
                    : data.binStart <= 30
                      ? "Mediano Plazo"
                      : data.binStart <= 60
                        ? "Largo Plazo"
                        : "Early Bird"}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calcular estadísticas
  const stats = useMemo(() => {
    if (filteredData.length === 0) return {};

    const leadTimes = filteredData.map((d) => d.leadTime).sort((a, b) => a - b);
    const mean = leadTimes.reduce((sum, lt) => sum + lt, 0) / leadTimes.length;
    const median = leadTimes[Math.floor(leadTimes.length / 2)];
    const mode = histogramData.reduce(
      (max, bin) => (bin.count > max.count ? bin : max),
      histogramData[0],
    );

    const lastMinute = filteredData.filter((d) => d.leadTime <= 7).length;
    const earlyBird = filteredData.filter((d) => d.leadTime >= 60).length;

    const avgRateLastMinute = filteredData
      .filter((d) => d.leadTime <= 7)
      .reduce((sum, r, _, arr) => sum + r.roomRate / arr.length, 0);

    const avgRateEarlyBird = filteredData
      .filter((d) => d.leadTime >= 60)
      .reduce((sum, r, _, arr) => sum + r.roomRate / arr.length, 0);

    return {
      mean: mean.toFixed(1),
      median: median.toFixed(1),
      mode: mode ? `${mode.binLabel} días` : "N/A",
      modeCount: mode ? mode.count : 0,
      lastMinutePercent: ((lastMinute / filteredData.length) * 100).toFixed(1),
      earlyBirdPercent: ((earlyBird / filteredData.length) * 100).toFixed(1),
      avgRateLastMinute: Math.round(avgRateLastMinute || 0),
      avgRateEarlyBird: Math.round(avgRateEarlyBird || 0),
      priceDifferential: Math.round(avgRateEarlyBird - avgRateLastMinute || 0),
      totalReservations: filteredData.length,
    };
  }, [filteredData, histogramData]);

  const segmentOptions = [
    { value: "all", label: "Todos los Segmentos" },
    { value: "Corporativo", label: "Corporativo" },
    { value: "Leisure", label: "Leisure" },
    { value: "Grupos", label: "Grupos" },
    { value: "Last Minute", label: "Last Minute" },
  ];

  const channelOptions = [
    { value: "all", label: "Todos los Canales" },
    { value: "Reserva Directa", label: "Reserva Directa" },
    { value: "Booking.com", label: "Booking.com" },
    { value: "Expedia", label: "Expedia" },
    { value: "Agencias", label: "Agencias" },
    { value: "Otros", label: "Otros" },
  ];

  const seasonOptions = [
    { value: "all", label: "Todas las Temporadas" },
    { value: "Baja", label: "Temporada Baja" },
    { value: "Media", label: "Temporada Media" },
    { value: "Alta", label: "Temporada Alta" },
    { value: "Especial", label: "Temporada Especial" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Distribución de Lead Time
            </h2>
            <p className="text-emerald-100 text-sm">
              Análisis de anticipación de reservas para pricing dinámico
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={binSize}
              onChange={(e) => setBinSize(parseInt(e.target.value))}
              className="px-3 py-1 rounded bg-white text-emerald-600 font-medium text-sm"
            >
              <option value={1}>Diario</option>
              <option value={7}>Semanal</option>
              <option value={14}>Quincenal</option>
              <option value={30}>Mensual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50">
        <select
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 text-sm"
        >
          {segmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 text-sm"
        >
          {channelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 text-sm"
        >
          {seasonOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Estadísticas clave */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50">
        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">{stats.mean}</p>
          <p className="text-xs text-gray-600">Lead Time Promedio</p>
          <p className="text-xs text-gray-500">días</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.median}</p>
          <p className="text-xs text-gray-600">Mediana</p>
          <p className="text-xs text-gray-500">días</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-lg font-bold text-purple-600">{stats.mode}</p>
          <p className="text-xs text-gray-600">Moda</p>
          <p className="text-xs text-gray-500">{stats.modeCount} reservas</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-red-600">
            {stats.lastMinutePercent}%
          </p>
          <p className="text-xs text-gray-600">Last Minute</p>
          <p className="text-xs text-gray-500">≤7 días</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-green-600">
            {stats.earlyBirdPercent}%
          </p>
          <p className="text-xs text-gray-600">Early Bird</p>
          <p className="text-xs text-gray-500">≥60 días</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-orange-600">
            ${stats.priceDifferential}
          </p>
          <p className="text-xs text-gray-600">Diferencial Precio</p>
          <p className="text-xs text-gray-500">Early vs Last</p>
        </div>
      </div>

      {/* Histograma */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={histogramData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="binLabel"
              tick={{ fontSize: 11, angle: -45, textAnchor: "end" }}
              height={80}
              interval={binSize === 1 ? 6 : 0}
              label={{
                value: "Lead Time (días)",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              label={{
                value: "Número de Reservas",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Líneas de referencia para categorías clave */}
            <ReferenceLine
              x="7-13"
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{ value: "7 días", position: "topRight" }}
            />
            <ReferenceLine
              x="30-36"
              stroke="#eab308"
              strokeDasharray="3 3"
              label={{ value: "30 días", position: "topRight" }}
            />
            <ReferenceLine
              x="60-66"
              stroke="#3b82f6"
              strokeDasharray="3 3"
              label={{ value: "60 días", position: "topRight" }}
            />

            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {histogramData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBinColor(entry.binStart)}
                  stroke={getBinColor(entry.binStart)}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Análisis de pricing dinámico */}
      <div className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-4">
          Insights para Pricing Dinámico
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Oportunidades last minute */}
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              🚨 Last Minute ({stats.lastMinutePercent}%)
            </h4>
            <div className="text-sm space-y-1">
              <p className="text-red-700">≤7 días antes de llegada</p>
              <p>
                <span className="text-gray-600">Tarifa promedio:</span>{" "}
                <span className="font-medium">${stats.avgRateLastMinute}</span>
              </p>
              <p className="text-xs text-red-600 mt-2">
                💡 Aumentar tarifas 20-30% para compensar inventario limitado
              </p>
            </div>
          </div>

          {/* Reservas anticipadas */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              🎯 Early Bird ({stats.earlyBirdPercent}%)
            </h4>
            <div className="text-sm space-y-1">
              <p className="text-blue-700">≥60 días antes de llegada</p>
              <p>
                <span className="text-gray-600">Tarifa promedio:</span>{" "}
                <span className="font-medium">${stats.avgRateEarlyBird}</span>
              </p>
              <p className="text-xs text-blue-600 mt-2">
                💡 Ofrecer descuentos 15-20% para asegurar ocupación temprana
              </p>
            </div>
          </div>

          {/* Zona óptima */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              ✅ Zona Óptima (8-59 días)
            </h4>
            <div className="text-sm space-y-1">
              <p className="text-green-700">Rango de reserva ideal</p>
              <p>
                <span className="text-gray-600">Concentración:</span>{" "}
                <span className="font-medium">
                  {(
                    100 -
                    parseFloat(stats.lastMinutePercent) -
                    parseFloat(stats.earlyBirdPercent)
                  ).toFixed(1)}
                  %
                </span>
              </p>
              <p className="text-xs text-green-600 mt-2">
                💡 Mantener tarifas regulares con ajustes por demanda
              </p>
            </div>
          </div>
        </div>

        {/* Recomendaciones estratégicas */}
        <div className="mt-4 bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">
            🎯 Recomendaciones de Pricing
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">
                Estrategias por Lead Time:
              </h5>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • <strong>0-7 días:</strong> Premium pricing (+25-40%)
                </li>
                <li>
                  • <strong>8-14 días:</strong> Standard pricing
                </li>
                <li>
                  • <strong>15-30 días:</strong> Promociones selectivas (-5-10%)
                </li>
                <li>
                  • <strong>31-60 días:</strong> Early bird discounts (-10-15%)
                </li>
                <li>
                  • <strong>60+ días:</strong> Maximum discount (-15-25%)
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-2">
                Optimizaciones Sugeridas:
              </h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Ajustar inventario según patrones históricos</li>
                <li>• Crear urgencia para reservas last minute</li>
                <li>• Incentivar reservas tempranas con valor agregado</li>
                <li>• Monitorear competencia en ventanas críticas</li>
                <li>• Segmentar ofertas por tipo de cliente</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Last Minute (0-7 días)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Corto Plazo (8-14 días)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Mediano Plazo (15-30 días)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Largo Plazo (31-60 días)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Early Bird (60+ días)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

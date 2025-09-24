import { ChannelBaseData } from "@/lib/charts/types";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const ChannelRankingChart = ({
  baseData,
}: {
  baseData: ChannelBaseData;
}) => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [sortBy, setSortBy] = useState("revenue");

  // Datos de canales de reserva
  const generateChannelData = (period: any) => {
    // Escalar para otros períodos
    const multipliers = {
      monthly: 1,
      quarterly: 3,
      yearly: 12,
    };

    const multiplier = multipliers[period];
    const periodData = {};

    Object.keys(baseData.monthly).forEach((channel) => {
      const data = baseData.monthly[channel];
      periodData[channel] = {
        ...data,
        reservations: Math.round(
          data.reservations * multiplier * (0.9 + Math.random() * 0.2),
        ),
        revenue: Math.round(
          data.revenue * multiplier * (0.9 + Math.random() * 0.2),
        ),
        commission: Math.round(
          data.commission * multiplier * (0.9 + Math.random() * 0.2),
        ),
      };
    });

    return periodData;
  };

  const channelsData = useMemo(
    () => generateChannelData(selectedPeriod),
    [selectedPeriod],
  );

  // Convertir a array y agregar métricas calculadas
  const channelsArray = useMemo(() => {
    const channels = Object.keys(channelsData).map((channelName) => {
      const data = channelsData[channelName];
      const netRevenue = data.revenue - data.commission;
      const commissionRate =
        data.commission > 0 ? (data.commission / data.revenue) * 100 : 0;
      const revenuePerReservation = data.revenue / data.reservations;
      const profitability = netRevenue / data.reservations;

      return {
        name: channelName,
        shortName:
          channelName.length > 15
            ? channelName.substring(0, 15) + "..."
            : channelName,
        ...data,
        netRevenue,
        commissionRate,
        revenuePerReservation,
        profitability,
      };
    });

    return channels;
  }, [channelsData]);

  // Calcular estadísticas globales
  const globalStats = useMemo(() => {
    const totalReservations = channelsArray.reduce(
      (sum, ch) => sum + ch.reservations,
      0,
    );
    const totalRevenue = channelsArray.reduce((sum, ch) => sum + ch.revenue, 0);
    const totalCommissions = channelsArray.reduce(
      (sum, ch) => sum + ch.commission,
      0,
    );
    const totalNetRevenue = totalRevenue - totalCommissions;
    const avgCommissionRate = (totalCommissions / totalRevenue) * 100;
    const directBookingShare =
      channelsArray.find((ch) => ch.name === "Reserva Directa")
        ?.marketShareRevenue || 0;

    return {
      totalReservations,
      totalRevenue,
      totalCommissions,
      totalNetRevenue,
      avgCommissionRate,
      directBookingShare,
    };
  }, [channelsArray]);

  const metricOptions = [
    { value: "revenue", label: "Revenue Total", icon: "💰" },
    { value: "netRevenue", label: "Revenue Neto", icon: "💎" },
    { value: "reservations", label: "Volumen Reservas", icon: "📊" },
    { value: "avgRate", label: "Tarifa Promedio", icon: "💳" },
    { value: "commission", label: "Comisión %", icon: "🔻" },
    { value: "conversion", label: "Conversión %", icon: "🎯" },
    { value: "satisfaction", label: "Satisfacción", icon: "⭐" },
    { value: "efficiency", label: "Eficiencia", icon: "🚀" },
  ];

  const periodOptions = [
    { value: "monthly", label: "Mensual" },
    { value: "quarterly", label: "Trimestral" },
    { value: "yearly", label: "Anual" },
  ];

  if (!baseData || !baseData.monthly) return <div>Cargando...</div>;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Ranking de Canales de Reserva
            </h2>
            <p className="text-blue-100 text-sm">
              Performance de canales - Volumen, Revenue y Comisiones
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 rounded bg-white text-blue-600 font-medium text-sm"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => {
                setSelectedMetric(e.target.value);
                setSortBy(e.target.value);
              }}
              className="px-3 py-1 rounded bg-white text-blue-600 font-medium text-sm"
            >
              <option value="" disabled>
                Mostrar por:
              </option>
              {metricOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPIs globales */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50">
        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-blue-600">
            {globalStats.totalReservations.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Total Reservas</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-green-600">
            ${globalStats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Revenue Total</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-purple-600">
            ${globalStats.totalNetRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Revenue Neto</p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-red-600">
            ${globalStats.totalCommissions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Comisiones</p>
          <p className="text-xs text-gray-500">
            ({globalStats.avgCommissionRate.toFixed(1)}%)
          </p>
        </div>

        <div className="text-center bg-white rounded-lg p-3 shadow-sm">
          <p className="text-2xl font-bold text-cyan-600">
            {globalStats.directBookingShare.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">Reserva Directa</p>
          <p className="text-xs text-gray-500">Market Share</p>
        </div>
      </div>

      {/* Gráfico de barras horizontales */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={channelsArray}
            layout="horizontal"
            margin={{ top: 20, right: 80, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            {/* ✅ usar una propiedad real: revenue */}
            <XAxis type="number" dataKey="revenue" tick={{ fontSize: 12 }} />

            <YAxis
              type="category"
              dataKey="shortName"
              tick={{ fontSize: 11 }}
              width={70}
            />

            {/* ✅ usar el mismo dataKey en Bar */}
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {channelsArray.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de ranking detallada */}
      <div className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-4">
          Ranking Detallado por{" "}
          {metricOptions.find((m) => m.value === selectedMetric)?.label}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white">
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Ranking
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Canal
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700">
                  Reservas
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700">
                  Revenue
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700">
                  Tarifa Avg
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700">
                  Comisión
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700">
                  Revenue Neto
                </th>
              </tr>
            </thead>
            <tbody>
              {channelsArray.map((channel, index) => (
                <tr
                  key={channel.name}
                  className="bg-white border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-600">
                        #{index + 1}
                      </span>
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: channel.color }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{channel.icon}</span>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right font-medium">
                    {channel.reservations.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-green-600">
                    ${channel.revenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${channel.avgRate.toFixed(0)}
                  </td>
                  <td className="px-3 py-2 text-right text-red-600">
                    {channel.commissionRate.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-purple-600">
                    ${channel.netRevenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights estratégicos */}
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Canal más rentable */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              💎 Canal Más Rentable
            </h4>
            <div className="text-sm">
              {(() => {
                const mostProfitable = [...channelsArray].sort(
                  (a, b) => b.netRevenue - a.netRevenue,
                )[0];
                return (
                  <>
                    <p className="font-medium text-green-700">
                      {mostProfitable.name}
                    </p>
                    <p className="text-green-600">
                      ${mostProfitable.netRevenue.toLocaleString()} neto
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      Comisión: {mostProfitable.commissionRate.toFixed(1)}%
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Mejor conversión */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              🎯 Mejor Conversión
            </h4>
            <div className="text-sm">
              {(() => {
                const bestConversion = [...channelsArray].sort(
                  (a, b) => b.conversionRate - a.conversionRate,
                )[0];
                return (
                  <>
                    <p className="font-medium text-blue-700">
                      {bestConversion.name}
                    </p>
                    <p className="text-blue-600">
                      {bestConversion.conversionRate.toFixed(1)}% conversión
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      Satisfacción:{" "}
                      {bestConversion.customerSatisfaction.toFixed(1)}/5.0
                    </p>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Oportunidad de mejora */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              ⚡ Oportunidad
            </h4>
            <div className="text-sm">
              {(() => {
                const highestCommission = [...channelsArray].sort(
                  (a, b) => b.commissionRate - a.commissionRate,
                )[0];
                return (
                  <>
                    <p className="font-medium text-orange-700">
                      Reducir dependencia
                    </p>
                    <p className="text-orange-600">{highestCommission.name}</p>
                    <p className="text-xs text-orange-500 mt-1">
                      Comisión más alta:{" "}
                      {highestCommission.commissionRate.toFixed(1)}%
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

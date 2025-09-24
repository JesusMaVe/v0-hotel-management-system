import type { Chart, ChartContent } from "@/lib/charts/types";
import { ProfileRadarChart } from "./specific-chart/profile-radar-chart";
import { LeadTimeHistogram } from "./specific-chart/lead-time-histogram";
import { ChannelRankingChart } from "./specific-chart/channel-ranking";
import { RoomOccupationForecast } from "./specific-chart/room-occupation-forecast";

export const ChartTypeHandler = ({ chart }: { chart: Chart | undefined }) => {
  if (!chart) {
    return (
      <div className="p-4 text-lg">
        no pudimos encontrar el chart solicitado, el Id es inválido
      </div>
    );
  }
  return <>{renderChart(chart.content)}</>;
};

const renderChart = (chartContent: ChartContent) => {
  switch (chartContent.type) {
    case "RADAR": {
      const radarDimensions = chartContent.baseData;
      return <ProfileRadarChart radarDimensions={radarDimensions} />;
    }
    case "LEAD_HISTOGRAM":
      return <LeadTimeHistogram />;
    case "CHANNEL_CHART":
      return <ChannelRankingChart baseData={chartContent.baseData} />;
    case "OCUPATION_FORECAST":
      return <RoomOccupationForecast />;

    default:
      return <>tipo de chart no válido</>;
  }
};

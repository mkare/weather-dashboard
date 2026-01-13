'use client';
import { Chart, AxisOptions } from 'react-charts';
import { useMemo } from 'react';
import { ForecastListItem } from '@/types/weather';

interface DailyChartProps {
  data: ForecastListItem[];
}

export default function DailyChart({ data }: DailyChartProps) {
  const chartData = useMemo(
    () => [
      {
        label: 'Temperature (°C)',
        data: data.map((item) => ({
          primary: new Date(item.dt * 1000),
          secondary: item.main.temp
        })),
        color: 'var(--color-destructive)'
      },
      {
        label: 'Humidity (%)',
        data: data.map((item) => ({
          primary: new Date(item.dt * 1000),
          secondary: item.main.humidity
        })),
        color: 'var(--color-primary)'
      },
      {
        label: 'Wind (m/s)',
        data: data.map((item) => ({
          primary: new Date(item.dt * 1000),
          secondary: item.wind.speed
        })),
        color: 'var(--color-info)'
      }
    ],
    [data]
  );

  const primaryAxis = useMemo<AxisOptions<{ primary: Date; secondary: number }>>(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: 'time'
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<{ primary: Date; secondary: number }>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary
      }
    ],
    []
  );

  if (!data || data.length === 0 || chartData[0].data.length === 0) {
    return <div>No chart data available.</div>;
  }

  return (
    <div className="bg-slate-50 rounded-lg shadow-lg pt-1 pb-6 w-full">
      <h3 className="text-xl font-bold text-primary my-4 px-6">5-Day / 3-Hour Forecast</h3>
      <div style={{ height: '300px', width: 'calc(100% - 3rem)' }} className="px-6">
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
            getSeriesStyle: (series) => ({
              color: series.originalSeries.color
            }),
            tooltip: {
              show: true
            }
          }}
        />
      </div>
    </div>
  );
}

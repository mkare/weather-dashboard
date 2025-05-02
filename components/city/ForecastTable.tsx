import { ForecastListItem } from '@/types/weather';

interface ForecastTableProps {
  data: ForecastListItem[];
}

const columns = [
  {
    label: 'Date/Time',
    render: (item: ForecastListItem) => new Date(item.dt * 1000).toLocaleString(),
    className: 'whitespace-nowrap'
  },
  { label: 'Temperature (°C)', render: (item: ForecastListItem) => item.main.temp },
  { label: 'Condition', render: (item: ForecastListItem) => item.weather[0].description },
  { label: 'Humidity (%)', render: (item: ForecastListItem) => item.main.humidity },
  { label: 'Wind (m/s)', render: (item: ForecastListItem) => item.wind.speed }
];

export default function ForecastTable({ data }: ForecastTableProps) {
  return (
    <div className="mb-8 w-full bg-slate-50 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-2">5-Day / 3-Hour Forecast Table</h2>
      <div className="overflow-x-auto max-h-64 overflow-y-auto">
        <table className="min-w-full text-xs">
          <thead className="sticky top-0 bg-slate-900 text-slate-100">
            <tr className="bg-slate-800 text-slate-100">
              {columns.map((col) => (
                <th key={col.label} className="p-2 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="even:bg-slate-700 even:text-slate-100">
                {columns.map((col, j) => (
                  <td key={j} className={`p-2 ${col.className}`}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

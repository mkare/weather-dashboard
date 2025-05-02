import { useEffect } from 'react';
import Image from 'next/image';
import { Unit, WeatherData } from '@/types/weather';
import { getWeatherIcon, msToKmh, msToMph } from '@/lib/weatherHelpers';
import WeatherStatCard from './WeatherStatCard';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: Unit;
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  useEffect(() => {
    const storedUnit = localStorage.getItem('unit') as Unit | null;
    if (storedUnit === 'metric' || storedUnit === 'imperial') {
      localStorage.setItem('unit', unit);
    } else {
      localStorage.setItem('unit', 'metric');
    }
  }, [unit]);
  return (
    <>
      <div className="mt-2 bg-slate-50 rounded-lg p-6 text-primary w-full shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col">
              <span className="flex justify-baseline align-baseline text-5xl font-bold">
                {data.main.temp.toFixed(1)}
                <span className="text-3xl mr-1">°</span>
                <span className="text-2xl">{unit === 'metric' ? 'C' : 'F'}</span>
              </span>
              <h2 className="text-2xl font-bold">
                {data.name}, {data.sys.country}
              </h2>
              <p>
                {data.main.temp_min.toFixed(1)}° / {data.main.temp_max.toFixed(1)}° Feels like{' '}
                {data.main.feels_like.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
              </p>
              <p className="text-slate-500 text-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={`${getWeatherIcon(data.weather[0].icon)}`}
              alt={data.weather[0].description}
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <span className="text-lg font-semibold">{data.weather[0].description}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WeatherStatCard
          title="Humidity"
          icon="/weather-icons/humidity.svg"
          iconAlt="Humidity Icon"
          value={<>{data.main.humidity}%</>}
          iconClassName="absolute right-4 top-6"
        >
          <p className="text-sm text-slate-700">Pressure: {data.main.pressure} hPa</p>
          {data.main.sea_level && <p className="text-sm text-slate-700">Sea Level: {data.main.sea_level} hPa</p>}
          {data.main.grnd_level && <p className="text-sm text-slate-700">Ground Level: {data.main.grnd_level} hPa</p>}
        </WeatherStatCard>
        <WeatherStatCard
          title="Wind Speed"
          icon="/weather-icons/wind.svg"
          iconAlt="Wind Icon"
          value={<>{unit === 'metric' ? `${data.wind.speed} m/s` : `${data.wind.speed} mph`}</>}
        >
          <p className="text-sm text-slate-700">
            {unit === 'metric' ? `${msToKmh(data.wind.speed)} km/h` : `${msToMph(data.wind.speed)} mph`}
          </p>
          <p className="text-sm text-slate-700">Direction: {data.wind.deg}°</p>
          {data.wind.gust && <p className="text-sm text-slate-700">Gust: {data.wind.gust} m/s</p>}
        </WeatherStatCard>
        <WeatherStatCard
          title="Visibility"
          icon="/weather-icons/clouds.svg"
          iconAlt="Cloud Icon"
          value={<>{data.clouds.all}%</>}
        />
        <WeatherStatCard
          title="Cloudiness"
          icon="/weather-icons/clouds.svg"
          iconAlt="Clouds Icon"
          value={<>{data.visibility / 1000} km</>}
        />
      </div>
    </>
  );
}

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Unit, WeatherData } from '@/types/weather';
import {
  getWeatherIcon,
  msToKmh,
  msToMph,
  celsiusToFahrenheit,
  metersToKm,
  metersToMiles
} from '@/lib/weatherHelpers';
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

  const {
    displayTemp,
    displayMinMax,
    displayFeelsLike,
    tempUnit,
    windSpeed,
    windSpeedUnit,
    windSpeedConverted,
    visibilityValue,
    visibilityUnit,
    cloudiness
  } = useMemo(() => {
    const isMetric = unit === 'metric';
    const temp = isMetric ? data.main.temp : Number(celsiusToFahrenheit(data.main.temp));
    const min = isMetric ? data.main.temp_min : Number(celsiusToFahrenheit(data.main.temp_min));
    const max = isMetric ? data.main.temp_max : Number(celsiusToFahrenheit(data.main.temp_max));
    const feelsLike = isMetric ? data.main.feels_like : Number(celsiusToFahrenheit(data.main.feels_like));
    const tempUnit = isMetric ? 'C' : 'F';
    const windSpeed = isMetric ? data.wind.speed : data.wind.speed;
    const windSpeedUnit = isMetric ? 'm/s' : 'mph';
    const windSpeedConverted = isMetric ? `${msToKmh(data.wind.speed)} km/h` : `${msToMph(data.wind.speed)} mph`;
    let visibilityValue: string;
    let visibilityUnit: string;
    if (isMetric) {
      visibilityValue = metersToKm(data.visibility);
      visibilityUnit = 'km';
    } else {
      visibilityValue = metersToMiles(data.visibility);
      visibilityUnit = 'mi';
    }
    const cloudiness = data.clouds.all;
    return {
      displayTemp: temp.toFixed(1),
      displayMinMax: `${min.toFixed(1)}° / ${max.toFixed(1)}°`,
      displayFeelsLike: feelsLike.toFixed(1),
      tempUnit,
      windSpeed,
      windSpeedUnit,
      windSpeedConverted,
      visibilityValue,
      visibilityUnit,
      cloudiness
    };
  }, [unit, data]);

  return (
    <>
      <div className="bg-slate-50 rounded-lg p-6 text-primary w-full shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col">
              <span className="flex justify-baseline align-baseline text-5xl font-bold">
                {displayTemp}
                <span className="text-3xl mr-1">°</span>
                <span className="text-2xl">{tempUnit}</span>
              </span>
              <h2 className="text-2xl font-bold">
                {data.name}, {data.sys.country}
              </h2>
              <p>
                {displayMinMax}
                <span className="ml-2">
                  Feels like {displayFeelsLike}°{tempUnit}
                </span>
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
          <p className="text-slate-500 text-sm">Pressure: {data.main.pressure} hPa</p>
          {data.main.sea_level && <p className="text-slate-500 text-sm">Sea Level: {data.main.sea_level} hPa</p>}
          {data.main.grnd_level && <p className="text-slate-500 text-sm">Ground Level: {data.main.grnd_level} hPa</p>}
        </WeatherStatCard>
        <WeatherStatCard
          title="Wind Speed"
          icon="/weather-icons/wind.svg"
          iconAlt="Wind Icon"
          value={
            <>
              {windSpeed} {windSpeedUnit}
            </>
          }
        >
          <p className="text-slate-500 text-sm">{windSpeedConverted}</p>
          <p className="text-slate-500 text-sm">Direction: {data.wind.deg}°</p>
          {data.wind.gust && <p className="text-slate-500 text-sm">Gust: {data.wind.gust} m/s</p>}
        </WeatherStatCard>
        <WeatherStatCard
          title="Cloudiness"
          icon="/weather-icons/clouds.svg"
          iconAlt="Clouds Icon"
          value={<>{cloudiness}%</>}
        />
        <WeatherStatCard
          title="Visibility"
          icon="/weather-icons/eye.svg"
          iconAlt="Cloud Icon"
          value={
            <>
              {visibilityValue} {visibilityUnit}
            </>
          }
        />
      </div>
    </>
  );
}

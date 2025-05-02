import Image from 'next/image';
import Link from 'next/link';
import { WeatherData } from '@/types/weather';
import { getWeatherIcon, msToKmh, slugify } from '@/lib/weatherHelpers';
import InfoCard from './InfoCard';
import { Unit } from '@/types/weather';

type Props = {
  city: string;
  weatherData: WeatherData;
  unit: Unit;
  isError: boolean;
  isFetching: boolean;
};

const WeatherDisplay = ({ city, weatherData, unit, isError, isFetching }: Props) => {
  if (!weatherData || isError || isFetching) return null;
  return (
    <div className="mt-6 bg-slate-50 rounded-lg p-6 text-primary w-full shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="flex justify-center sm:justify-start align-baseline text-5xl font-bold">
              {weatherData.main.temp.toFixed(1)}
              <span className="text-3xl mr-1">°</span>
              <span className="text-2xl">{unit === 'metric' ? 'C' : 'F'}</span>
            </span>
            <Link href={`/city/${slugify(city)}`}>
              <h2 className="text-2xl font-bold">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
            </Link>
            <p>
              {weatherData.main.temp_min.toFixed(1)}° / {weatherData.main.temp_max.toFixed(1)}° Feels like{' '}
              {weatherData.main.feels_like.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
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
            src={getWeatherIcon(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <span className="text-lg font-semibold">{weatherData.weather[0].description}</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="Humidity">
          <Image
            src="/weather-icons/humidity.svg"
            alt="Humidity Icon"
            width={36}
            height={36}
            className="absolute right-4 top-4"
          />
          <p className="text-xl">{weatherData.main.humidity}%</p>
          <p className="text-sm text-slate-700">Pressure: {weatherData.main.pressure} hPa</p>
          {weatherData.main.sea_level && (
            <p className="text-sm text-slate-700">Sea Level: {weatherData.main.sea_level} hPa</p>
          )}
          {weatherData.main.grnd_level && (
            <p className="text-sm text-slate-700">Ground Level: {weatherData.main.grnd_level} hPa</p>
          )}
        </InfoCard>
        <InfoCard title="Wind">
          <Image
            src="/weather-icons/wind.svg"
            alt="Wind Icon"
            width={36}
            height={36}
            className="absolute right-4 top-4"
          />
          <p className="text-xl">
            {unit === 'metric' ? `${weatherData.wind.speed} m/s` : `${weatherData.wind.speed} mph`}
          </p>
          <p className="text-sm text-slate-700">
            {unit === 'metric'
              ? `${msToKmh(weatherData.wind.speed)} km/h`
              : `${(weatherData.wind.speed * 1.60934).toFixed(1)} km/h`}
          </p>
          <p className="text-sm text-slate-700">Direction: {weatherData.wind.deg}°</p>
          {weatherData.wind.gust && <p className="text-sm text-slate-700">Gust: {weatherData.wind.gust} m/s</p>}
        </InfoCard>
        <InfoCard title="Cloudiness">
          <Image
            src="/weather-icons/clouds.svg"
            alt="Cloud Icon"
            width={36}
            height={36}
            className="absolute right-4 top-4"
          />
          <p className="text-xl">{weatherData.clouds.all}%</p>
        </InfoCard>
        <InfoCard title="Visibility">
          <Image
            src="/weather-icons/eye.svg"
            alt="Visibility Icon"
            width={36}
            height={36}
            className="absolute right-4 top-4"
          />
          <p className="text-xl">{(weatherData.visibility / 1000).toFixed(1)} km</p>
        </InfoCard>
        <InfoCard title="Sunrise / Sunset" className="sm:col-span-2">
          <p className="text-xl flex align-middle mt-1">
            <Image
              src="/weather-icons/sunrise.svg"
              alt="Sunrise Icon"
              width={28}
              height={28}
              className="inline-block mr-2"
            />
            <span className="mr-2 mt-1">
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <Image
              src="/weather-icons/sunset.svg"
              alt="Sunset Icon"
              width={28}
              height={28}
              className="inline-block ml-4 mr-2"
            />
            <span className="mt-1">
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </InfoCard>
        <div className="sm:col-span-2 flex justify-end">
          <Link href={`/city/${slugify(city)}`} className="hover:underline text-primary font-semibold mt-2">
            View More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

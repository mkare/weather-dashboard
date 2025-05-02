'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { WeatherData, ForecastListItem, Unit } from '@/types/weather';
import LocalStorageManager from '@/lib/localstorageManager';

const DailyChart = dynamic(() => import('@/components/city/DailyChart'), { ssr: false });
const CurrentWeather = dynamic(() => import('@/components/city/CurrentWeather'), { ssr: false });
const ForecastTable = dynamic(() => import('@/components/city/ForecastTable'), { ssr: false });
const CityHeader = dynamic(() => import('@/components/city/CityHeader'), { ssr: false });

interface CityContentProps {
  weatherData: WeatherData | null;
  forecastList: ForecastListItem[] | null;
}

export default function CityContent({ weatherData, forecastList }: CityContentProps) {
  const [unit, setUnit] = useState<Unit>('metric');

  useEffect(() => {
    const stored = LocalStorageManager.getUnit();
    if (stored === 'metric' || stored === 'imperial') setUnit(stored);
  }, []);

  const handleToggle = (val: Unit) => {
    setUnit(val);
    LocalStorageManager.setUnit(val);
  };

  return (
    <main className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4">
      <CityHeader unit={unit} onToggle={handleToggle} />
      {weatherData && weatherData.cod === 200 && <CurrentWeather data={weatherData} unit={unit} />}
      {forecastList && <DailyChart data={forecastList} />}
      {forecastList && <ForecastTable data={forecastList} />}
    </main>
  );
}

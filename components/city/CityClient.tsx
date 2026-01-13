'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { setUnit } from '@/lib/store/weatherSlice';
import { WeatherData, ForecastListItem, Unit } from '@/types/weather';
import LocalStorageManager from '@/lib/localstorageManager';
import CityHeader from './CityHeader';
import CurrentWeather from './CurrentWeather';
import DailyChart from './DailyChart';
import ForecastTable from './ForecastTable';

interface CityClientProps {
  weatherData: WeatherData | null;
  forecastList: ForecastListItem[] | null;
  error: string | null;
}

export default function CityClient({ weatherData, forecastList, error }: CityClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const unit = useSelector((state: RootState) => state.weather.unit);

  const handleToggle = (newUnit: Unit) => {
    dispatch(setUnit(newUnit));
    LocalStorageManager.setUnit(newUnit);
  };

  return (
    <>
      <CityHeader unit={unit} onToggle={handleToggle} />

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
          <p>Error: {error}</p>
        </div>
      )}

      {weatherData && weatherData.cod === 200 && <CurrentWeather data={weatherData} unit={unit} />}

      {forecastList && <DailyChart data={forecastList} />}

      {forecastList && <ForecastTable data={forecastList} unit={unit} />}
    </>
  );
}

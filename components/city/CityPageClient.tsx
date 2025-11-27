// components/city/CityPageClient.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherData, ForecastResponse } from '@/types/weather';
import {
  setCity,
  setWeatherData,
  setForecastData,
  setWeatherLoading,
  setWeatherError,
  clearWeatherData
} from '@/lib/store/weatherSlice';
import CityHeader from '@/components/city/CityHeader'; // CityHeader'ı import et
import CurrentWeather from '@/components/city/CurrentWeather'; // CurrentWeather'ı import et
// import CityContent from '@/components/city/CityContent'; // Eğer kullanacaksanız forecast için
import { AppDispatch, RootState } from '@/lib/store';

interface CityPageClientProps {
  initialCity: string;
  initialWeatherData: WeatherData | null;
  initialForecastData: ForecastResponse | null;
  serverError: string | null;
}

export default function CityPageClient({
  initialCity,
  initialWeatherData,
  initialForecastData,
  serverError
}: CityPageClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentWeather: weatherDataFromStore, // Store'dan gelen veriyi farklı isimlendir
    forecast: forecastDataFromStore,
    loading,
    error: reduxError,
    unit // unit'i de store'dan alabilirsiniz, CityHeader ve CurrentWeather kendi içlerinde alacak
  } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(clearWeatherData()); // Önceki verileri temizle
    dispatch(setWeatherLoading(true));
    dispatch(setCity(initialCity));

    if (serverError) {
      dispatch(setWeatherError(serverError));
    } else {
      if (initialWeatherData) {
        dispatch(setWeatherData(initialWeatherData));
      } else {
        dispatch(setWeatherData(null)); // Explicitly set to null if not provided and no server error
        dispatch(setWeatherError(`Weather data not available for ${initialCity}.`));
      }
      if (initialForecastData) {
        dispatch(setForecastData(initialForecastData));
      } else {
        dispatch(setForecastData(null));
        // Forecast için ayrı bir hata mesajı da eklenebilir.
        // dispatch(setWeatherError(`Forecast data not available for ${initialCity}.`));
      }
    }
    dispatch(setWeatherLoading(false)); // Yükleme bitti
  }, [initialCity, initialWeatherData, initialForecastData, serverError, dispatch]);

  const displayError = serverError || reduxError;

  if (loading) {
    return <div className="container p-4 text-center">Loading weather information...</div>;
  }

  // CityHeader ve CurrentWeather artık props almayacak (unit hariç, veya unit de Redux'tan)
  // Onlar Redux store'dan verileri kendileri çekecekler.
  return (
    <div className="space-y-6 p-4">
      <CityHeader /> {/* unit ve onToggle props'ları kaldırılacak */}
      {displayError &&
        !weatherDataFromStore && ( // Sadece veri yoksa ve hata varsa göster
          <div className="container p-4 bg-red-100 text-red-700 rounded-md text-center">
            <p>Error: {displayError}</p>
          </div>
        )}
      {/* CurrentWeather, store'dan weatherDataFromStore ve unit alacak */}
      {weatherDataFromStore && weatherDataFromStore.cod === 200 && <CurrentWeather />}
      {/*
      Eğer forecast için ayrı bir component (CityContent) varsa:
      {forecastDataFromStore && forecastDataFromStore.cod === "200" && !displayError && (
        <CityContent />
      )}
      */}
    </div>
  );
}

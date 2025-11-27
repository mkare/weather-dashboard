// app/[city]/page.tsx
import { Metadata } from 'next';
import { WeatherData, ForecastResponse, GeoDataItem } from '@/types/weather'; // GeoDataItem eklendi
import { getGeoData, getCurrentWeather, getForecastData } from '@/lib/weatherApi'; // weatherApi yolu kontrol edin
import CityPageClient from '@/components/city/CityPageClient'; // Yeni İstemci Bileşeni

interface CityPageProps {
  params: { city: string };
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city);
  return {
    title: `Weather in ${decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1)}`
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const encodedCity = params.city;
  const city = decodeURIComponent(encodedCity);

  let geoDataResponse: GeoDataItem[] | null = null;
  let weatherData: WeatherData | null = null;
  let forecastData: ForecastResponse | null = null;
  let error: string | null = null;

  try {
    geoDataResponse = await getGeoData(city);

    if (!geoDataResponse || geoDataResponse.length === 0 || !geoDataResponse[0]?.lat || !geoDataResponse[0]?.lon) {
      error = `City "${city}" not found or coordinates are unavailable.`;
    } else {
      const { lat, lon } = geoDataResponse[0];
      // Paralel API çağrıları
      const [weatherResult, forecastResult] = await Promise.allSettled([
        getCurrentWeather(lat, lon),
        getForecastData(lat, lon)
      ]);

      if (weatherResult.status === 'fulfilled') {
        weatherData = weatherResult.value;
        if (weatherData?.cod !== 200 && typeof weatherData?.cod !== 'string') {
          // API'den gelen 'cod' number ise
          error = weatherData?.message || `Weather API error for ${city}. Code: ${weatherData?.cod}`;
          weatherData = null; // Hatalı veriyi client'a gönderme
        } else if (typeof weatherData?.cod === 'string' && weatherData.cod !== '200' && weatherData.cod !== '404') {
          // OpenWeather string hata kodları
          error = weatherData?.message || `Weather API error for ${city}. Code: ${weatherData?.cod}`;
          weatherData = null;
        }
      } else {
        console.error('Error fetching current weather:', weatherResult.reason);
        error = `Could not fetch current weather for ${city}.`;
      }

      if (forecastResult.status === 'fulfilled') {
        forecastData = forecastResult.value;
        if (forecastData?.cod !== '200') {
          // Hava durumu hatası varsa onu koru, yoksa forecast hatasını ata
          error =
            error || (forecastData?.message as string) || `Forecast API error for ${city}. Code: ${forecastData?.cod}`;
          forecastData = null; // Hatalı veriyi client'a gönderme
        }
      } else {
        console.error('Error fetching forecast data:', forecastResult.reason);
        error = error || `Could not fetch forecast data for ${city}.`;
      }
    }
  } catch (e: any) {
    console.error('General error in CityPage data fetching:', e);
    error = e.message || 'An unexpected error occurred while fetching weather data.';
  }

  return (
    <CityPageClient
      initialCity={city}
      initialWeatherData={weatherData}
      initialForecastData={forecastData}
      serverError={error}
    />
  );
}

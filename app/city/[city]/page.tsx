// app/[city]/page.tsx
import { Metadata } from 'next';
import { WeatherData, ForecastResponse, GeoDataItem } from '@/types/weather'; // GeoDataItem eklendi
import { getGeoData, getCurrentWeather, getForecastData } from '@/lib/weatherApi'; // weatherApi yolu kontrol edin
import CityClient from '@/components/city/CityClient';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const capitalizedCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);

  return {
    title: `${capitalizedCity} Weather Forecast | Weather Dashboard`,
    description: `Current weather conditions and 5-day forecast for ${capitalizedCity}. Temperature, humidity, wind speed and more.`,
    openGraph: {
      title: `${capitalizedCity} Weather`,
      description: `Check the weather in ${capitalizedCity}`,
      type: 'website'
    }
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: encodedCity } = await params;
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
          error = error || forecastData?.message || `Forecast API error for ${city}. Code: ${forecastData?.cod}`;
          forecastData = null; // Hatalı veriyi client'a gönderme
        }
      } else {
        console.error('Error fetching forecast data:', forecastResult.reason);
        error = error || `Could not fetch forecast data for ${city}.`;
      }
    }
  } catch (e) {
    console.error('General error in CityPage data fetching:', e);
    let errMessage = 'An unexpected error occurred while fetching weather data.';
    if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
      errMessage = e.message;
    }
    error = errMessage;
  }

  return (
    <>
      <main className="flex flex-col gap-2 sm:gap-3 w-full max-w-3xl mx-auto p-4">
        <CityClient weatherData={weatherData} forecastList={forecastData?.list ?? null} error={error} />
      </main>
    </>
  );
}

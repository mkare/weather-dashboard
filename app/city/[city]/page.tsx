import { Metadata } from 'next';
import { WeatherData, ForecastResponse } from '@/types/weather';
import { getGeoData, getCurrentWeather, getForecastData } from '@/app/api/weather/route';
import Header from '@/components/Header';
import CityContent from '@/components/city/CityContent';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  return {
    title: `Weather in ${city}`
  };
}

export default async function CityPage(props: CityPageProps) {
  const { params } = props;
  const { city } = await params;

  const geoData = await getGeoData(city);
  const lat = geoData[0]?.lat;
  const lon = geoData[0]?.lon;

  let weatherData: WeatherData | null = null;
  if (lat && lon) {
    weatherData = await getCurrentWeather(lat, lon);
  }

  let forecastData: ForecastResponse | null = null;
  if (lat && lon) {
    forecastData = await getForecastData(lat, lon);
  }

  return (
    <>
      <Header />
      {lat && lon && forecastData && forecastData.cod === '200' ? (
        <CityContent weatherData={weatherData} forecastList={forecastData.list} />
      ) : (
        <div className="container">
          <p>City not found or API error.</p>
        </div>
      )}
    </>
  );
}

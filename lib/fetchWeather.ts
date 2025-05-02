import { Unit } from '@/types/weather';

export async function fetchWeather(city: string, unit: Unit) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'City not found');
  }
  return response.json();
}

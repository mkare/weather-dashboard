import { WeatherData } from '@/types/weather';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const type = searchParams.get('type') || 'current';
  const appid = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!appid) {
    return Response.json({ message: 'OpenWeather API key not found in environment variables' }, { status: 401 });
  }

  let url = '';

  if (type === 'geo' && city) {
    url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${appid}`;
  } else if (type === 'current' && lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;
  } else if (type === 'forecast' && lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;
  } else if (type === 'daily' && lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=16&appid=${appid}`;
  } else {
    return Response.json({ message: 'Missing or invalid parameters' }, { status: 400 });
  }

  const res = await fetch(url, { next: { revalidate: 900 } });

  if (!res.ok) {
    return Response.json({ message: 'Failed to fetch data' }, { status: 500 });
  }

  if (type === 'current') {
    const data: WeatherData = await res.json();
    return Response.json(data);
  } else if (type === 'daily') {
    const data = await res.json();
    return Response.json(data);
  } else {
    const data = await res.json();
    return Response.json(data);
  }
}

export async function getGeoData(city: string) {
  const appid = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!appid) throw new Error('OpenWeather API key not found');
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${appid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch geo data');
  return res.json();
}

export async function getCurrentWeather(lat: number, lon: number) {
  const appid = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!appid) throw new Error('OpenWeather API key not found');
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch current weather');
  return res.json();
}

export async function getForecastData(lat: number, lon: number) {
  const appid = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!appid) throw new Error('OpenWeather API key not found');
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch forecast data');
  return res.json();
}

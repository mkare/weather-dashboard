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

export type WeatherData = {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    type?: number;
    id?: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: { id?: number; main?: string; description: string; icon: string }[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
  timezone: number;
  coord?: {
    lon: number;
    lat: number;
  };
  base?: string;
  id?: number;
  cod?: number;
};
export type WeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  };
  hourly: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  }[];
};

// OpenWeather 5-day/3-hour forecast tipi
export type ForecastListItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  clouds: { all: number };
  wind: { speed: number; deg: number };
  visibility: number;
  pop?: number;
  dt_txt: string;
};

export type ForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
  };
};

export type Unit = 'metric' | 'imperial';

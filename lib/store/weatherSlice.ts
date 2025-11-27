import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, ForecastResponse } from '@/types/weather';

export interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: string | null;
  city: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  city: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action: PayloadAction<WeatherData | null>) => {
      state.currentWeather = action.payload;
      state.loading = false;
      if (action.payload && action.payload.cod !== 200) {
        state.error = action.payload.message || 'Error fetching weather data.';
      } else {
        state.error = null;
      }
    },
    setForecastData: (state, action: PayloadAction<ForecastResponse | null>) => {
      state.forecast = action.payload;
      state.loading = false;
      if (action.payload && action.payload.cod !== '200') {
        state.error = action.payload.message?.toString() || 'Error fetching forecast data.';
      } else {
        state.error = null;
      }
    },
    setWeatherLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setWeatherError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.city = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setCity, setWeatherData, setForecastData, setWeatherLoading, setWeatherError, clearWeatherData } =
  weatherSlice.actions;

export default weatherSlice.reducer;

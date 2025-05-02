'use client';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '@/lib/fetchWeather';
import SearchInput from './SearchInput';
import SearchHistory from './SearchHistory';
import WeatherDisplay from './WeatherDisplay';
import Alert from '@/components/ui/Alert';
import { DEFAULT_CITY, HISTORY_KEY, UNIT_KEY } from '@/constants/defaults';
import { Unit } from '@/types/weather';

export default function Search() {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [unit, setUnit] = useState<Unit>('metric');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchCity, setSearchCity] = useState<string>('');
  const [showInfo, setShowInfo] = useState(false);
  const [isAutoSearch, setIsAutoSearch] = useState(false);

  const {
    data: weatherData,
    error,
    isError,
    isFetching
  } = useQuery({
    queryKey: ['weather', searchCity, unit],
    queryFn: () => fetchWeather(searchCity, unit),
    enabled: !!searchCity,
    retry: false
  });

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setSearchCity(parsed[0]);
        setIsAutoSearch(true);
      } else {
        setSearchCity(DEFAULT_CITY);
        setShowInfo(true);
        setIsAutoSearch(true);
      }
    } else {
      setSearchCity(DEFAULT_CITY);
      setShowInfo(true);
      setIsAutoSearch(true);
    }
    const storedUnit = localStorage.getItem(UNIT_KEY) as Unit | null;
    if (storedUnit === 'metric' || storedUnit === 'imperial') setUnit(storedUnit);
  }, []);

  const handleSearch = (cityToSearch?: string, auto = false) => {
    const value = cityToSearch ?? city;
    const query = typeof value === 'string' ? value.trim() : '';
    if (!query) return;
    setSearchCity(query);
    setIsAutoSearch(auto);
  };

  useEffect(() => {
    if (
      searchCity &&
      weatherData &&
      !isError &&
      !isFetching &&
      weatherData.name &&
      weatherData.name.toLowerCase() === searchCity.toLowerCase() &&
      !(isAutoSearch && searchCity === DEFAULT_CITY)
    ) {
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== searchCity.toLowerCase());
        return [searchCity, ...filtered].slice(0, 5);
      });
    } else if (showInfo) {
      setShowInfo(true);
    }
  }, [weatherData, isError, isFetching, searchCity, isAutoSearch, showInfo]);

  useEffect(() => {
    const filteredHistory = history.filter((item) => item !== DEFAULT_CITY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(UNIT_KEY, unit);
  }, [unit]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <SearchInput
        city={city}
        setCity={setCity}
        unit={unit}
        setUnit={setUnit}
        handleSearch={handleSearch}
        inputRef={inputRef}
      />
      <SearchHistory history={history} setCity={setCity} handleSearch={handleSearch} />
      {isError && <Alert message={error?.message || 'An error occurred.'} variant="error" />}
      {isFetching && <Alert message="Loading weather data..." variant="loading" dismissible={false} />}
      {showInfo && (
        <Alert
          message={`Location unavailable. Displaying default location: ${DEFAULT_CITY}`}
          onClose={() => setShowInfo(false)}
          variant="info"
        />
      )}
      <WeatherDisplay
        city={city ? city : DEFAULT_CITY}
        weatherData={weatherData}
        unit={unit}
        isError={isError}
        isFetching={isFetching}
      />
    </div>
  );
}

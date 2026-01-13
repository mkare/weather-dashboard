import Search from '@/components/search/Search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather Dashboard - Search Cities',
  description:
    'Search for weather forecasts in any city worldwide. Get current conditions, temperature, humidity and 5-day forecasts.',
  keywords: ['weather', 'forecast', 'temperature', 'humidity', 'wind']
};

export default function Home() {
  return (
    <main>
      <Search />
    </main>
  );
}

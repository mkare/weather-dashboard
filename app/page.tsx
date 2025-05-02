import Header from '@/components/Header';
import Search from '@/components/search/Search';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Search />
      </main>
      <footer className="mt-8 text-center text-gray-500">
        <p className="mt-4 text-gray-500">
          Powered by{' '}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            OpenWeather
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} MKare. All rights reserved.</p>
      </footer>
    </>
  );
}

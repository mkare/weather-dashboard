export default function Footer() {
  return (
    <footer className="my-8 text-center text-gray-500">
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
      <p className="mt-4 text-gray-500">
        <a
          href="https://github.com/MKare"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Visit our GitHub
        </a>
      </p>
    </footer>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="text-slate-700 p-4 mt-8 mb-2 text-center">
      <Link href="/" className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-sky-400">
          Weather Forecast
        </h1>
      </Link>
    </header>
  );
}

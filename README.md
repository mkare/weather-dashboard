# Weather Dashboard

A modern, responsive weather dashboard built with Next.js, TypeScript, Redux Toolkit, React Query, and OpenWeatherMap API. The project is designed with a clean, maintainable, and scalable structure inspired by the feature-sliced pattern, with a focus on developer experience and user usability.

## Features

- **City Search:** Search for any city to view current weather and a 5-day forecast.
- **Weather Data:** Displays city, country, temperature (Celsius & Fahrenheit), weather condition, humidity, wind speed, and weather icons.
- **Unit Toggle:** Switch between metric (Celsius) and imperial (Fahrenheit) units.
- **Search History:** Last 5 searched cities are shown, clickable, and persisted with localStorage.
- **Error Handling:** User-friendly error messages for invalid searches or API failures.
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop.
- **Performance:** Lazy loading, code splitting, and image optimization for fast load times.
- **State Management:** Uses Redux Toolkit for global state and React Query for API caching.
- **Type Safety:** Entire codebase is written in TypeScript.
- **Deployment:** Ready for deployment on Vercel.

## Project Structure

The project follows a simplified, flexible structure inspired by the feature-sliced pattern:

```
components/
  ui/         # Reusable UI primitives (Button, Input, Alert, etc.)
  search/     # Search bar, history, weather display, etc.
  city/       # City-specific weather and forecast components
  ...
app/          # Next.js app directory (routing, pages, API routes)
hooks/        # Custom React hooks
lib/          # API and utility functions
constants/    # App-wide constants and defaults
public/       # Static assets (weather icons, images)
types/        # TypeScript type definitions
```

This approach keeps the codebase clean, modular, and easy to extend. Each feature (search, city, UI) is isolated, making it simple to maintain and scale.

## How It Works

- **Search:** Users enter a city name in the search bar. The app fetches weather data from the OpenWeatherMap API and displays it.
- **Weather Display:** Shows current weather, weather icon, and a 5-day forecast. Weather icons are mapped to conditions using local SVGs.
- **Search History:** The last 5 searches are stored in localStorage and shown below the search bar. Clicking a history item re-fetches weather data.
- **Unit Toggle:** Users can switch between Celsius and Fahrenheit. The selection is persisted and reflected across the app.
- **Error Handling:** Invalid city names or API errors are caught and shown as clear, user-friendly alerts.
- **State Management:** Redux Toolkit manages global state (unit, history, etc.), while React Query handles API data fetching and caching.
- **Performance:** Next.js image optimization, lazy loading, and code splitting are used for fast, efficient loading.

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
2. **Set up environment variables:**
   - Create a `.env.local` file and add your OpenWeatherMap API key:
     ```env
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     ```
3. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com/). Just connect your repository and set the `NEXT_PUBLIC_OPENWEATHER_API_KEY` environment variable in the Vercel dashboard.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Folder Overview

- `components/ui/` – Reusable UI elements (Button, Input, Alert, etc.)
- `components/search/` – Search bar, search history, weather display, etc.
- `components/city/` – City-specific weather and forecast components
- `app/` – Next.js app directory (routing, pages, API routes)
- `hooks/` – Custom React hooks
- `lib/` – API and utility functions
- `constants/` – App-wide constants and defaults
- `public/weather-icons/` – Weather icons (SVG)
- `types/` – TypeScript type definitions

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather icons from [OpenWeatherMap](https://openweathermap.org/weather-conditions) and custom SVGs

---

Feel free to contribute or open issues for suggestions and improvements!

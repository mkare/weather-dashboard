import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '../components/Providers';
import StoreProvider from '@/components/StoreProvider'; // Doğru yolu belirtin

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app built with Next.js'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen`}
        style={{
          background: 'linear-gradient(to bottom, #f0f4f8, #e0e7ff)',
          color: '#1e293b'
        }}
      >
        <StoreProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}

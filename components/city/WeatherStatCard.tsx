import Image from 'next/image';
import React from 'react';

interface WeatherStatCardProps {
  title: string;
  icon: string;
  iconAlt: string;
  value: React.ReactNode;
  children?: React.ReactNode;
  iconClassName?: string;
}

const WeatherStatCard = ({ title, icon, iconAlt, value, children, iconClassName }: WeatherStatCardProps) => (
  <div className="bg-slate-50 rounded-lg p-6 text-primary w-full shadow-lg relative">
    <h1 className="text-xl font-bold">{title}</h1>
    <Image src={icon} alt={iconAlt} width={36} height={36} className={iconClassName || 'absolute right-4 top-4'} />
    <p className="text-xl">{value}</p>
    {children}
  </div>
);

export default WeatherStatCard;

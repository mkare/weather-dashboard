import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard = ({ title, children, className = '' }: InfoCardProps) => (
  <div className={`bg-slate-100 border border-slate-200 p-3 rounded-lg relative ${className}`}>
    <h3 className="text-gray-400 text-sm">{title}</h3>
    {children}
  </div>
);

export default InfoCard;

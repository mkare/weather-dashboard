'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Unit } from '@/types/weather';
import LocalStorageManager from '@/lib/localstorageManager';

export default function CityHeader() {
  const [unit, setUnit] = useState<Unit>('metric');

  useEffect(() => {
    const stored = LocalStorageManager.getUnit();
    if (stored) setUnit(stored);
  }, []);

  const handleToggle = (val: Unit) => {
    setUnit(val);
    LocalStorageManager.setUnit(val);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 shadow-md rounded-lg gap-4 max-w-3xl mx-auto w-full">
      <Link href="/" className="text-primary hover:underline text-sm">
        Back to search page
      </Link>
      <div className="flex items-center gap-4">
        <Toggle value={unit} onChange={handleToggle} />
      </div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: Unit; onChange: (val: Unit) => void }) {
  return (
    <label className="relative inline-flex cursor-pointer select-none items-center p-1 group">
      <input
        type="checkbox"
        checked={value === 'imperial'}
        onChange={() => onChange(value === 'metric' ? 'imperial' : 'metric')}
        className="sr-only"
      />
      <span
        className={`flex items-center rounded py-2 px-4 text-sm font-medium transition-colors ${
          value === 'metric' ? 'bg-slate-200 text-slate-600' : 'bg-transparent text-slate-400'
        }`}
      >
        °C
      </span>
      <span
        className={`flex items-center rounded py-2 px-4 text-sm font-medium transition-colors ${
          value === 'imperial' ? 'bg-slate-200 text-slate-600' : 'bg-transparent text-slate-400'
        }`}
      >
        °F
      </span>
    </label>
  );
}

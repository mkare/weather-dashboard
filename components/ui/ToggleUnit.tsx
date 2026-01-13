import React from 'react';
import { Unit } from '@/types/weather';

type Props = {
  value: Unit;
  onChange: (val: Unit) => void;
};

export default function ToggleUnit({ value, onChange }: Props) {
  return (
    <label className="relative inline-flex cursor-pointer select-none items-center rounded-md bg-white dark:bg-dark-2 p-1 group shadow">
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
        Metric: °C, m/s
      </span>
      <span
        className={`flex items-center rounded py-2 px-4 text-sm font-medium transition-colors ${
          value === 'imperial' ? 'bg-slate-200 text-slate-600' : 'bg-transparent text-slate-400'
        }`}
      >
        Imperial: °F, mph
      </span>
    </label>
  );
}

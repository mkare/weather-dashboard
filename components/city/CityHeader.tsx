'use client';
import Link from 'next/link';
import { Unit } from '@/types/weather';
import ToggleUnit from '@/components/ui/ToggleUnit';

interface CityHeaderProps {
  unit: Unit;
  onToggle: (val: Unit) => void;
}

export default function CityHeader({ unit, onToggle }: CityHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2 gap-4 max-w-3xl mx-auto w-full">
      <Link href="/" className="text-primary hover:underline text-sm">
        Back to search page
      </Link>
      <div className="flex items-center gap-4">
        <ToggleUnit value={unit} onChange={onToggle} />
      </div>
    </div>
  );
}

// function Toggle({ value, onChange }: { value: Unit; onChange: (val: Unit) => void }) {
//   return (
//     <label className="relative inline-flex cursor-pointer select-none items-center p-1 group">
//       <input
//         type="checkbox"
//         checked={value === 'imperial'}
//         onChange={() => onChange(value === 'metric' ? 'imperial' : 'metric')}
//         className="sr-only"
//       />
//       <span
//         className={`flex items-center rounded py-2 px-4 text-sm font-medium transition-colors ${
//           value === 'metric' ? 'bg-slate-200 text-slate-600' : 'bg-transparent text-slate-400'
//         }`}
//       >
//         °C
//       </span>
//       <span
//         className={`flex items-center rounded py-2 px-4 text-sm font-medium transition-colors ${
//           value === 'imperial' ? 'bg-slate-200 text-slate-600' : 'bg-transparent text-slate-400'
//         }`}
//       >
//         °F
//       </span>
//     </label>
//   );
// }

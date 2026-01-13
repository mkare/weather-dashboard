import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RefObject } from 'react';
import ToggleUnit from '@/components/ui/ToggleUnit';
import { Unit } from '@/types/weather';

type Props = {
  city: string;
  setCity: (city: string) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  handleSearch: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function SearchInput({ city, setCity, unit, setUnit, handleSearch, inputRef }: Props) {
  return (
    <div className="flex flex-col justify-between items-center w-full gap-2 sm:flex-row ">
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-64"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={!city}>
          Search
        </Button>
      </div>
      <div className="flex items-center ml-2">
        <ToggleUnit value={unit} onChange={setUnit} />
      </div>
    </div>
  );
}

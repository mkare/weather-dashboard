import { Button } from '@/components/ui/Button';

type Props = {
  history: string[];
  setCity: (city: string) => void;
  handleSearch: (city: string) => void;
};

export default function SearchHistory({ history, setCity, handleSearch }: Props) {
  if (history.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3 w-full mx-auto justify-center">
      {history.map((item, idx) => (
        <Button
          key={item + idx}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => {
            setCity(item);
            handleSearch(item);
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

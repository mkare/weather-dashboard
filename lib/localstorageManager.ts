import { HISTORY_KEY, UNIT_KEY } from '@/constants/defaults';
import { Unit } from '@/types/weather';

export default class LocalStorageManager {
  static getHistory(): string[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  }

  static setHistory(history: string[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  static getUnit(): Unit | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const storedUnit = localStorage.getItem(UNIT_KEY) as Unit | null;
    if (storedUnit === 'metric' || storedUnit === 'imperial') {
      return storedUnit;
    }
    return null;
  }

  static setUnit(unit: Unit): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(UNIT_KEY, unit);
  }
}

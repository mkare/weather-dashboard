// components/StoreProvider.tsx
'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import { setUnit } from '@/lib/store/weatherSlice';
import LocalStorageManager from '@/lib/localstorageManager';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Client-side'da localStorage'dan unit'i oku ve store'a set et
    const storedUnit = LocalStorageManager.getUnit();
    if (storedUnit && storeRef.current) {
      storeRef.current.dispatch(setUnit(storedUnit));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

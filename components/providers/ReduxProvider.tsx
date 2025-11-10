'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import { fetchFollowers, hydrateFromCache } from '@/lib/features/followers/followersSlice';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  const initializedRef = useRef(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // โหลดข้อมูลจาก localStorage เมื่อ component mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const store = storeRef.current;
    if (!store || typeof window === 'undefined') return;

    try {
      const serializedState = localStorage.getItem('followersState');
      if (serializedState) {
        const parsed = JSON.parse(serializedState);
        const today = new Date().toISOString().split('T')[0];
        
        // ถ้าข้อมูลยังใหม่ (ดึงวันนี้) ให้ใช้ข้อมูลจาก localStorage
        if (parsed.lastFetchedDate === today && parsed.data) {
          // Hydrate store with cached data
          store.dispatch(hydrateFromCache({
            data: parsed.data,
            lastFetchedDate: parsed.lastFetchedDate,
          }));
        } else {
          // ถ้าข้อมูลเก่าแล้ว ให้ดึงข้อมูลใหม่
          store.dispatch(fetchFollowers());
        }
      } else {
        // ไม่มีข้อมูลใน cache ให้ดึงข้อมูลใหม่
        store.dispatch(fetchFollowers());
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      // ถ้าเกิดข้อผิดพลาด ให้ดึงข้อมูลใหม่
      store.dispatch(fetchFollowers());
    }
  }, []);

  // Subscribe to store changes and save to localStorage
  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const followersState = state.followers;
      
      // บันทึกข้อมูลลง localStorage เมื่อมีการเปลี่ยนแปลง
      if (followersState.lastFetchedDate && followersState.data) {
        try {
          const serializedState = JSON.stringify({
            data: followersState.data,
            lastFetchedDate: followersState.lastFetchedDate,
          });
          localStorage.setItem('followersState', serializedState);
        } catch (err) {
          console.error('Error saving to localStorage:', err);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <Provider store={storeRef.current!}>{children}</Provider>;
}


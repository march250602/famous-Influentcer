'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import { fetchFollowers, hydrateFromCache } from '@/lib/features/followers/followersSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig'; // Firestore client instance
import axios from "axios";

interface SocialMediaItem {
  id: string;
  social_media: 'facebook' | 'youtube' | 'tiktok';
  chanel_name: string;
  link: string;
  fetch_date: string;
  follower_count: number;
}

interface FollowerData {
  platform: 'youtube' | 'facebook' | 'tiktok';
  count: number;
  label: string;
  lastUpdated: string; // ISO date string
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  const initializedRef = useRef(false);

  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {

    if (initializedRef.current) return;
    initializedRef.current = true;

    const store = storeRef.current;
    if (!store || typeof window === 'undefined') return;

    const loadData = async () => {
      const today = new Date().toISOString().split('T')[0];

      // โหลดแคชจาก localStorage
      let localCache: { data?: any; lastFetchedDate?: string } = {};
      try {
        const serializedState = localStorage.getItem('followersState');
        if (serializedState) localCache = JSON.parse(serializedState);
      } catch (err) {
        console.error('Error reading localStorage:', err);
      }

      // ดึงข้อมูลล่าสุดจาก Firestore
      try {
  const response = await axios.get('/api/social_media');
 const firestoreDataArray: SocialMediaItem[] = response.data;
  const today = new Date().toISOString().split('T')[0];

  // แปลง array เป็น object map by social_media
  const firestoreData: Record<string, any> = {};
  firestoreDataArray.forEach(item => {
    firestoreData[item.social_media] = item;
  });

  // เช็คแต่ละ platform
  // ตัวอย่างใช้ Facebook
  const fbData = firestoreData.facebook;

  if (fbData) {
    const fetch_date = fbData.fetch_date.split('T')[0];

    if (fetch_date === today && localCache.lastFetchedDate === today) {
      // 1. fetch_date และ localStorage วันนี้ตรงกัน
      store.dispatch(
        hydrateFromCache({
          data: localCache.data,
          lastFetchedDate: localCache.lastFetchedDate,
        })
      );
    } else if (fetch_date === today && localCache.lastFetchedDate !== today) {
      // 2. fetch_date วันนี้แต่ localStorage เก่า → update cache
      const dataForStore: {
  youtube: FollowerData | null;
  facebook: FollowerData | null;
  tiktok: FollowerData | null;
} = {
  youtube: null,
  facebook: null,
  tiktok: null,
};
      firestoreDataArray.forEach((item: SocialMediaItem) => {
  dataForStore[item.social_media] = {
    label: item.chanel_name,
    platform: item.social_media,
    lastUpdated: item.fetch_date,
    count: item.follower_count,
  };
});

      store.dispatch(
        hydrateFromCache({
          data: dataForStore,
          lastFetchedDate: today,
        })
      );

      localStorage.setItem(
        'followersState',
        JSON.stringify({ data: dataForStore, lastFetchedDate: today })
      );
    } else {
      // 3. fetch_date ไม่ใช่วันนี้ → ดึง API ใหม่
      store.dispatch(fetchFollowers());
    }
  } else {
    // Firestore ไม่มีข้อมูล → ดึง API ใหม่
    store.dispatch(fetchFollowers());
  }
} catch (err) {
  console.error('Error fetching social media data:', err);
  store.dispatch(fetchFollowers());
}

    };

    loadData();
  }, []);

  // Subscribe store เพื่ออัพเดท localStorage
  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const followersState = state.followers;

      if (followersState.lastFetchedDate && followersState.data) {
        try {
          localStorage.setItem(
            'followersState',
            JSON.stringify({
              data: followersState.data,
              lastFetchedDate: followersState.lastFetchedDate,
            })
          );
        } catch (err) {
          console.error('Error saving to localStorage:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current!}>{children}</Provider>;
}

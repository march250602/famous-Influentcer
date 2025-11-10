import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface FollowerData {
  platform: 'youtube' | 'facebook' | 'tiktok';
  count: number;
  label: string;
  lastUpdated: string; // ISO date string
}

interface FollowersState {
  data: {
    youtube: FollowerData | null;
    facebook: FollowerData | null;
    tiktok: FollowerData | null;
  };
  loading: boolean;
  error: string | null;
  lastFetchedDate: string | null; // วันที่ดึงข้อมูลล่าสุด (YYYY-MM-DD)
}

const initialState: FollowersState = {
  data: {
    youtube: null,
    facebook: null,
    tiktok: null,
  },
  loading: false,
  error: null,
  lastFetchedDate: null,
};

// Helper function to check if we need to fetch new data
const shouldFetchNewData = (lastFetchedDate: string | null): boolean => {
  if (!lastFetchedDate) return true;
  
  const today = new Date().toISOString().split('T')[0];
  return lastFetchedDate !== today;
};

// Async thunk to fetch followers data
export const fetchFollowers = createAsyncThunk(
  'followers/fetchFollowers',
  async () => {
    const response = await fetch('/api/followers');
    if (!response.ok) {
      throw new Error('Failed to fetch followers data');
    }
    const data = await response.json();
    return data;
  }
);

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    hydrateFromCache: (state, action: PayloadAction<{ data: FollowersState['data']; lastFetchedDate: string }>) => {
      state.data = action.payload.data;
      state.lastFetchedDate = action.payload.lastFetchedDate;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action: PayloadAction<FollowerData[]>) => {
        state.loading = false;
        const today = new Date().toISOString().split('T')[0];
        
        // Update data for each platform
        action.payload.forEach((item) => {
          if (item.platform === 'youtube') {
            state.data.youtube = item;
          } else if (item.platform === 'facebook') {
            state.data.facebook = item;
          } else if (item.platform === 'tiktok') {
            state.data.tiktok = item;
          }
        });
        
        state.lastFetchedDate = today;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch followers';
      });
  },
});

export const { clearError, hydrateFromCache } = followersSlice.actions;

// Selector to check if we need to fetch new data
export const selectShouldFetchFollowers = (state: { followers: FollowersState }): boolean => {
  return shouldFetchNewData(state.followers.lastFetchedDate);
};

export default followersSlice.reducer;


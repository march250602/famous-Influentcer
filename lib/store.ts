import { configureStore } from '@reduxjs/toolkit';
import followersReducer from './features/followers/followersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      followers: followersReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


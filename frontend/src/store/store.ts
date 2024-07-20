import { configureStore } from '@reduxjs/toolkit';

import coinsReducer from './coinsSlice';

export const store = configureStore({
  reducer: {
    coinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

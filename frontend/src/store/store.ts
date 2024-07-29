import { configureStore } from '@reduxjs/toolkit';

import coinsReducer, { CoinState } from './coinsSlice';
import { loadState, persistStateMiddleware } from './localStorageUtils';
import socketReducer, { SocketState } from './socketSlice';

const preloadedState: CoinState = loadState();

export const store = configureStore({
  reducer: {
    coinsReducer,
    socketReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

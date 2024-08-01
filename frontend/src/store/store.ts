import { combineReducers, configureStore } from '@reduxjs/toolkit';

import coinsReducer, { CoinState } from './coinsSlice';
import { loadState, persistStateMiddleware } from './localStorageUtils';
import socketReducer from './socketSlice';

const preloadedState: CoinState = loadState();

const rootReducer = combineReducers({
  coinsReducer,
  socketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { Middleware } from '@reduxjs/toolkit';
import { CoinState, initialState } from './coinsSlice';

export const persistStateMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
    return result;
  };

export const loadState = (): CoinState => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as CoinState;
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return initialState;
  }
};

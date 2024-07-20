import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as coinService from '../services/coinService';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export interface CoinState {
  currentCoin: string | null;
  coins: Coin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CoinState = {
  currentCoin: null,
  coins: [],
  status: 'idle',
};

export const fetchCoins: any = createAsyncThunk<Coin[], string>(
  'coins/fetchCoins',
  async (symbol: string) => {
    const coins = await coinService.fetchCoins(symbol);
    return coins;
  }
);

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCurrentCoin(state, action) {
      state.currentCoin = action.payload;
    },
    setCoins(state, action) {
      state.coins = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.fulfilled, (state, action: PayloadAction<Coin[]>) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCurrentCoin, setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;

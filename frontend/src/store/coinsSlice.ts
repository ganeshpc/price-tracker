import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as coinService from '../services/coinService';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  createdAt: string;
}

export interface CoinState {
  currentCoin: string | null;
  coins: Coin[];
  availableCoins: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CoinState = {
  currentCoin: '',
  coins: [],
  availableCoins: [],
  status: 'idle',
};

export const fetchCoins: any = createAsyncThunk<Coin[], void>(
  'coins/fetchCoins',
  async (_, { getState }) => {
    const state: any = getState();
    const symbol = state.coinsReducer.currentCoin;
    if (symbol === null) {
      return [];
    }
    const coins = await coinService.fetchCoinData(symbol);
    return coins;
  }
);

export const fetchAvailableCoins: any = createAsyncThunk<string[], void>(
  'coins/fetchAvailableCoins',
  async () => {
    const coins = await coinService.fetchAvailableCoins();
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

    builder.addCase(
      fetchAvailableCoins.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.availableCoins = action.payload;
      }
    );
  },
});

export const { setCurrentCoin, setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;

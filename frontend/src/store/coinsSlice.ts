import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as coinService from '../services/coinService';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  createdAt: string;
}

export interface CoinInfo {
  name: string;
  symbol: string;
  rank: number;
  age: number; // in days
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number; // number exchanges on which the coin is listed
  markets: number; // number of markets on which the coin is listed
  pairs: number; // number of unique market coin is present
  allTimeHighUSD: number;
  circulatingSupply: number; // circulating supply of the coin
  totalSupply: number; // number of coins minted, including locked
  maxSupply: number; // maximum number of coins that can be minted
  categories: string[]; // array of category strings
  volume: number;
  cap: number;
}

export interface CoinState {
  currentCoin: string | null;
  coins: Coin[];
  availableCoins: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  coinInfos: CoinInfo[];
}

export const initialState: CoinState = {
  currentCoin: '',
  coins: [],
  availableCoins: [],
  status: 'idle',
  coinInfos: [],
};

export const fetchCoins: any = createAsyncThunk<Coin[], void>(
  'coins/fetchCoins',
  async (_, { getState }) => {
    const state: any = getState();
    const symbol = state.coinsReducer.currentCoin;
    if (!symbol) {
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

export const fetchCoinInfos: any = createAsyncThunk<CoinInfo[], void>(
  'coins/fetchCoinInfos',
  async () => {
    const coinInfos = await coinService.fetchCoinInfos();
    return coinInfos;
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

    builder.addCase(
      fetchCoinInfos.fulfilled,
      (state, action: PayloadAction<CoinInfo[]>) => {
        state.coinInfos = action.payload;
      }
    );
  s,
});

export const { setCurrentCoin, setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;

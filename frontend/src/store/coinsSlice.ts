import { createSlice } from '@reduxjs/toolkit';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export interface CoinState {
  currentCoin: string | null;
  coins: Coin[];
}

const initialState: CoinState = {
  currentCoin: null,
  coins: [],
};

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
});

export const { setCurrentCoin, setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;

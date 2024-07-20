import axiosService from './axiosService';

import { Coin } from '../store/coinsSlice';

export const fetchCoins = async (symbol: string): Promise<Coin[]> => {
  const response = await axiosService.get(`/api/prices/${symbol}`);
  const coins: Coin[] = response.data.map((coin: any) => {
    return {
      ...coin,
      id: coin._id,
    };
  });
  return coins;
};

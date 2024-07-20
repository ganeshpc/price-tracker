import axiosService from './axiosService';

import { Coin } from '../store/coinsSlice';

export const fetchCoins = async (symbol: string): Promise<Coin[]> => {
  const response = await axiosService.get(`/api/prices/${symbol}`);
  return response.data as Coin[];
};

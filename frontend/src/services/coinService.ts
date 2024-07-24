import axiosService from './axiosService';

import { Coin } from '../store/coinsSlice';

export const fetchCoinData = async (symbol: string): Promise<Coin[]> => {
  const response = await axiosService.get(`/api/prices/${symbol}`);
  const coins: Coin[] = response.data.map((coin: any) => {
    return {
      ...coin,
      id: coin._id,
    };
  });
  return coins;
};

export const fetchAvailableCoins = async (): Promise<string[]> => {
  const response = await axiosService.get('/api/coins');
  return response.data;
};

export const fetchCoinInfos = async (): Promise<any> => {
  const response = await axiosService.get(`/api/coins/info`);
  return response.data;
}

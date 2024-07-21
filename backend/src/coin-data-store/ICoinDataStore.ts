// Purpose: Interface for the storing coin data.

import ICoinData from '../models/ICoinData';

interface ICoinDataStore {
  saveCoinData(coinData: ICoinData[]): Promise<void>;
  getLatestCoinData(symbol: string, limit: number): Promise<ICoinData[] | null>;
}

export default ICoinDataStore;

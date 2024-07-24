// Purpose: Interface for the storing coin data.

import { CoinInfo } from '../models/CoinInfoMongoModel';
import ICoinData from '../models/ICoinData';

interface ICoinDataStore {
  saveCoinData(coinData: ICoinData[]): Promise<void>;
  getLatestCoinData(symbol: string, limit: number): Promise<ICoinData[] | null>;
  saveCoinInfo(coinInfo: CoinInfo): Promise<void>;
  saveCoinInfos(coinInfos: CoinInfo[]): Promise<void>;
  getCoinInfo(symbol: string): Promise<CoinInfo | null>;
  getCoinInfos(): Promise<CoinInfo[]>;
}

export default ICoinDataStore;

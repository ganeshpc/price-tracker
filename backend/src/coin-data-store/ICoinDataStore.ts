import ICoinData from '../models/ICoinData';

interface ICoinDataStore {
  saveCoinData(coinData: ICoinData[]): Promise<void>;
  getCoinData(symbol: string): Promise<ICoinData[] | null>;
}

export default ICoinDataStore;

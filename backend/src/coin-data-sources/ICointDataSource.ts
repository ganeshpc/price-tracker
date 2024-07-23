// Purpose: Interface for the Coin Data Sources.

import { CoinInfo } from '../models/CoinInfoMongoModel';
import ICoinData from '../models/ICoinData';

interface ICoinDataSource {
  getCoinData(): Promise<ICoinData[]>;
  getCoinInfo(coinCode: string): Promise<CoinInfo | null>;
}

export default ICoinDataSource;

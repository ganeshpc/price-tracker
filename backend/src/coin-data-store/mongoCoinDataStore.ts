import ICoinDataStore from './ICoinDataStore';
import ICoinData from '../models/ICoinData';
import CoinDataMongoModel from '../models/CoinDataMongoModel';
import logger from '../utils/winston.config';

class MongoCoinDataStore implements ICoinDataStore {
  async saveCoinData(coinData: ICoinData[]): Promise<void> {
    logger.info('saving coin data to mongo', { coinData });
    CoinDataMongoModel.insertMany(coinData);
  }

  async getLatestCoinData(
    symbol: string,
    limit: number
  ): Promise<ICoinData[] | null> {
    const coinData = await CoinDataMongoModel.find({ symbol })
      .sort({ createdAt: -1 })
      .limit(limit);
    return coinData;
  }
}

export default new MongoCoinDataStore();

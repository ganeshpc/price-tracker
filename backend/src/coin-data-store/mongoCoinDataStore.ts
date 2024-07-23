import ICoinDataStore from './ICoinDataStore';
import ICoinData from '../models/ICoinData';
import CoinDataMongoModel from '../models/CoinDataMongoModel';
import logger from '../utils/winston.config';
import CoinInfoMongoModel, { CoinInfo } from '../models/CoinInfoMongoModel';

class MongoCoinDataStore implements ICoinDataStore {
  async saveCoinData(coinData: ICoinData[]): Promise<void> {
    logger.debug('saving coin data to mongo');
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

  async saveCoinInfo(coinInfo: CoinInfo): Promise<void> {
    logger.debug('saving coin info to mongo');
    CoinInfoMongoModel.create(coinInfo);
  }

  async saveCoinInfos(coinInfos: CoinInfo[]): Promise<void> {
    logger.debug('saving coin infos to mongo');
    CoinInfoMongoModel.insertMany(coinInfos);
  }
}

export default new MongoCoinDataStore();

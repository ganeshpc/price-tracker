import ICoinDataStore from './ICoinDataStore';
import ICoinData from '../models/ICoinData';
import CoinDataMongoModel from '../models/CoinDataMongoModel';
import logger from '../utils/winston.config';
import CoinInfoMongoModel, { CoinInfo } from '../models/CoinInfoMongoModel';
import { MongooseError } from 'mongoose';

class MongoCoinDataStore implements ICoinDataStore {
  async getCoinInfo(symbol: string): Promise<CoinInfo | null> {
    const coinInfo = await CoinInfoMongoModel.findOne({ symbol });

    return coinInfo;
  }

  getCoinInfos(): Promise<CoinInfo[]> {
    const coinInfos = CoinInfoMongoModel.find();

    return coinInfos;
  }
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
    try {
      await CoinInfoMongoModel.create(coinInfo);
    } catch (error: any) {
      if (error.code === 11000) {
        logger.info(`Coin info for ${coinInfo.symbol} already exists`);
      } else {
        logger.error(`Error saving coin info: ${error}`);
      }
    }
  }

  async saveCoinInfos(coinInfos: CoinInfo[]): Promise<void> {
    logger.debug('saving coin infos to mongo');
    try {
      await CoinInfoMongoModel.insertMany(coinInfos);
    } catch (error: any) {
      if (error.code === 11000) {
        logger.info(`Coin info for coinInfos already exists`);
      } else {
        logger.error(`Error saving coin info: ${error}`);
      }
    }
  }
}

export default new MongoCoinDataStore();

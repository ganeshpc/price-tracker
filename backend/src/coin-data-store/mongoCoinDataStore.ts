import ICoinDataStore from './ICoinDataStore';
import ICoinData from '../models/ICoinData';
import CoinDataMongoModel from '../models/CoinDataMongoModel';
import logger from '../utils/winston.config';

class MongoCoinDataStore implements ICoinDataStore {
  async saveCoinData(coinData: ICoinData[]): Promise<void> {
    logger.info('saving coin data to mongo', { coinData });
    CoinDataMongoModel.insertMany(coinData);
  }

  async getCoinData(symbol: string): Promise<ICoinData[] | null> {
    throw new Error('Method not implemented.');
  }
}

export default new MongoCoinDataStore();

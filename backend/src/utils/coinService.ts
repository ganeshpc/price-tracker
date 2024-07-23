import coinwatch from '../coin-data-sources/coinwatch';
import ICoinDataSource from '../coin-data-sources/ICointDataSource';
import ICoinDataStore from '../coin-data-store/ICoinDataStore';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';
import { CoinInfo } from '../models/CoinInfoMongoModel';
import coinsToWatch from './coinsToWatch';
import logger from './winston.config';

class CoinService {
  coinDataSource: ICoinDataSource;
  coinDataStore: ICoinDataStore;

  constructor() {
    this.coinDataSource = coinwatch;
    this.coinDataStore = mongoCoinDataStore;
  }

  async fetchAndSaveCoinInfo() {
    try {
      const coinsCodes = coinsToWatch;

      const coinInfos: CoinInfo[] = [];

      for (const coinCode of coinsCodes) {
        const coinInfo = await this.coinDataSource.getCoinInfo(coinCode);

        if (coinInfo !== null) {
          coinInfos.push(coinInfo);
        }
      }

      await this.coinDataStore.saveCoinInfos(coinInfos);
    } catch (error) {
      logger.error(`Error saving coin info: ${error}`);
    }
  }
}

export default new CoinService();

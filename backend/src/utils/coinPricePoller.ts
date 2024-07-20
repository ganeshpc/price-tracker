import logger from './winston.config';
import ICoinDataSource from '../coin-data-sources/ICointDataSource';
import coinwatch from '../coin-data-sources/coinwatch';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';

class CoinPricePoller {
  pollingInterval: NodeJS.Timeout | undefined;
  coinDataSource: ICoinDataSource;
  pollingFrequency: number;

  constructor() {
    this.coinDataSource = coinwatch;
    this.pollingFrequency = 10000;
  }

  startPolling() {
    this.pollingInterval = setInterval(async () => {
      logger.debug('polling coin data source');
      const coins = await this.coinDataSource.getCoinData();
      mongoCoinDataStore.saveCoinData(coins);
    }, this.pollingFrequency);
  }

  stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}

export default new CoinPricePoller();

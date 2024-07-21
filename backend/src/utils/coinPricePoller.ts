// Purpose: Polls the coin data source at a set interval and saves the data to the database.

import logger from './winston.config';
import ICoinDataSource from '../coin-data-sources/ICointDataSource';
import coinwatch from '../coin-data-sources/coinwatch';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';

class CoinPricePoller {
  pollingInterval: NodeJS.Timeout | undefined;
  coinDataSource: ICoinDataSource;
  pollingFrequency: number;

  constructor() {
    logger.info('CoinPricePoller initialized');
    this.coinDataSource = coinwatch;
    this.pollingFrequency = 20000;
  }

  startPolling() {
    logger.info('starting CoinPricePoller');
    this.pollingInterval = setInterval(async () => {
      logger.debug('polling coin data source');
      const coins = await this.coinDataSource.getCoinData();
      mongoCoinDataStore.saveCoinData(coins);
    }, this.pollingFrequency);
  }

  stop() {
    logger.info('stopping CoinPricePoller');
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}

export default new CoinPricePoller();

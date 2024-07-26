// Purpose: Polls the coin data source at a set interval and saves the data to the database.

import logger from './winston.config';
import ICoinDataSource from '../coin-data-sources/ICointDataSource';
import coinwatch from '../coin-data-sources/coinwatch';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';
import EventEmitter from 'events';

class CoinPricePoller extends EventEmitter {
  pollingInterval: NodeJS.Timeout | undefined;
  coinDataSource: ICoinDataSource;
  pollingFrequency: number;

  constructor() {
    super();
    logger.info('CoinPricePoller initialized');
    this.coinDataSource = coinwatch;
    this.pollingFrequency = process.env.PRICE_POLLING_FREQUENCY ? parseInt(process.env.PRICE_POLLING_FREQUENCY) : 5000;
  }

  startPolling() {
    logger.info('starting CoinPricePoller');
    this.pollingInterval = setInterval(async () => this.pollData, this.pollingFrequency);
  }

  async pollData() {
    logger.debug('polling coin data source');
    const coins = await this.coinDataSource.getCoinData();
    mongoCoinDataStore.saveCoinData(coins);

    this.emit('priceData', coins);
  }

  stop() {
    logger.info('stopping CoinPricePoller');
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}

export default new CoinPricePoller();

import ICoinDataSource from '../coin-data-sources/ICointDataSource';
import coinwatch from '../coin-data-sources/coinwatch';
import logger from './winston.config';

class CoinPricePoller {
  pollingInterval: NodeJS.Timeout | undefined;
  coinDataSource: ICoinDataSource;

  constructor() {
    this.coinDataSource = coinwatch;
  }

  startPolling() {
    this.pollingInterval = setInterval(async () => {
      logger.info('polling coin data source');
      const coins = await this.coinDataSource.getCoinData();
      logger.info('coin data source polled', { coins });
    }, 5000);
  }

  stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}

export default new CoinPricePoller();

// Purpose: Coinwatch API data source class.

import axios, { AxiosError } from 'axios';

import ICoinData from '../models/ICoinData';
import ICoinDataSource from './ICointDataSource';
import coinsToWatch from '../utils/coinsToWatch';
import logger from '../utils/winston.config';

class Coinwatch implements ICoinDataSource {
  coinwatchEndpoint =
    process.env.COINWATCH_API_ENDPOINT ||
    'https://api.livecoinwatch.com/coins/map';

  constructor() {
    logger.info('Coinwatch API Initialized');
  }

  async getCoinData(): Promise<ICoinData[]> {
    try {
      const response = await axios.post(
        this.coinwatchEndpoint,
        {
          codes: coinsToWatch,
          currency: 'USD',
          sort: 'rank',
          order: 'ascending',
          offset: 0,
          limit: 0,
          meta: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.COINWATCH_API_KEY,
          },
        }
      );

      const responseCoins = response.data;

      const coins: ICoinData[] = responseCoins.map((coin: any) => ({
        id: coin.code,
        name: coin.code,
        symbol: coin.code,
        price: coin.rate,
      }));

      return coins;
    } catch (error: AxiosError | any) {
      logger.error('Error getting coin data from Coinwatch', { error });
      if (error.response.status === 401) {
        logger.error('Coinwatch API key is invalid');
      }
      return [];
    }
  }
}

export default new Coinwatch();

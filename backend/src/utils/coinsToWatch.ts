// Purpose: List of coins to watch for price changes.

import logger from './winston.config';

if (!process.env.COINS_TO_WATCH) {
  process.env.COINS_TO_WATCH = 'BTC,ETH,USDT,BNB,SOL';
}

logger.info('Coins to watch:', { coinsToWatch: process.env.COINS_TO_WATCH });

const coinsToWatch = process.env.COINS_TO_WATCH.split(',');

export default coinsToWatch;

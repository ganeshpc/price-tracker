if (!process.env.COINS_TO_WATCH) {
  process.env.COINS_TO_WATCH = 'BTC,ETH,USDT,BNB,SOL';
}

const coinsToWatch = process.env.COINS_TO_WATCH.split(',');

export default coinsToWatch;

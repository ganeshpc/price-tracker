import { Router } from 'express';

import logger from '../utils/winston.config';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';

const router = Router();

router.get('/:symbol', async (req, res) => {
  logger.info('GET /api/prices/:symbol', { params: req.params });

  const { symbol } = req.params;

  const coinData = await mongoCoinDataStore.getLatestCoinData(symbol, 20);

  return res.json(coinData);
});

export default router;

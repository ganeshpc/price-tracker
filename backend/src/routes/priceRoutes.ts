import { Router, Request, Response, NextFunction } from 'express';

import logger from '../utils/winston.config';
import mongoCoinDataStore from '../coin-data-store/mongoCoinDataStore';

const router = Router();

router.get(
  '/:symbol',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('GET /api/prices/:symbol', { params: req.params });
    const { symbol } = req.params;

    try {
      const coinData = await mongoCoinDataStore.getLatestCoinData(symbol, 20);

      return res.json(coinData);
    } catch (error) {
      logger.error('Error getting coin data', { error });
      next(error);
    }
  }
);

/**
 * Error handler for price routes handles ProjectError
 */
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  next(error);
});

export default router;

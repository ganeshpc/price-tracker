import { Router, Request, Response, NextFunction } from 'express';

import logger from '../utils/winston.config';
import coinsToWatch from '../utils/coinsToWatch';
import coinService from '../utils/coinService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  logger.debug('GET /api/coins', { params: req.params });

  return res.json(coinsToWatch);
});

router.get('/info', async (req: Request, res: Response) => {
  logger.debug('GET /api/coins/info', { params: req.params });

  const coinInfos = await coinService.getInfos();

  return res.json(coinInfos);
})

/**
 * Error handler for coin routes handles ProjectError
 */
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  next(error);
});

export default router;

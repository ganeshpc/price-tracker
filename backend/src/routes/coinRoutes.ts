import { Router, Request, Response, NextFunction } from 'express';

import logger from '../utils/winston.config';
import coinsToWatch from '../utils/coinsToWatch';

const router = Router();

router.get('/', async (req, res) => {
  logger.info('GET /api/coins', { params: req.params });

  return res.json(coinsToWatch);
});

/**
 * Error handler for coin routes handles ProjectError
 */
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  next(error);
});

export default router;

import { Router } from 'express';

import logger from '../utils/winston.config';
import coinsToWatch from '../utils/coinsToWatch';

const router = Router();

router.get('/', async (req, res) => {
  logger.info('GET /api/coins', { params: req.params });

  return res.json(coinsToWatch);
});

export default router;

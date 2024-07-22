import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import priceRoutes from './routes/priceRoutes';
import coinRoutes from './routes/coinRoutes';
import logger from './utils/winston.config';

const app = express();

app.use(express.json());

app.use((req, res, next) => { logger.debug('req.url: ', req.url); next(); });

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api/prices', priceRoutes);
app.use('/api/coins', coinRoutes);

app.get('/health', (req, res) => {
  console.info('GET /health health check');
  return res.json({
    status: 'ok',
  });
});

// final error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('final error handler', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;

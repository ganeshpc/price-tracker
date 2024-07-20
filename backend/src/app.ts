import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import priceRoutes from './routes/priceRoutes';

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api/prices', priceRoutes);

app.get('/health', (req, res) => {
  console.info('GET /health health check');
  return res.json({
    status: 'ok',
  });
});

// final error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('final error handler', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;

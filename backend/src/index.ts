import dotenv from 'dotenv';
dotenv.config();

import { Server } from 'http';
import mongoose from 'mongoose';

import logger from './utils/winston.config';

import app from './app';
import coinPricePoller from './utils/coinPricePoller';
import coinService from './utils/coinService';
import SocketManager from './socket/SocketManager';

const PORT = process.env.PORT ?? 9001;

const main = async () => {
  try {
    logger.info('starting api-server...');

    // connect to mongodb
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('connected to mongodb');

    // save initial coin info
    await coinService.fetchAndSaveCoinInfo();

    // start the coin price poller
    coinPricePoller.startPolling();

    const appServer: Server = app.listen(PORT, () => {
      logger.info(`api server listening on port: ${PORT}`);
    });

    const socketManager = new SocketManager(appServer);


  } catch (error) {
    logger.error('error starting server', error);
    process.exit(1);
  }
};

main();

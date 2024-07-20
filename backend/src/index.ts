import dotenv from 'dotenv';
dotenv.config();

import logger from './utils/winston.config';

import app from './app';

const PORT = process.env.PORT ?? 9000;

const main = async () => {
  try {
    logger.info('starting api-server...');

    app.listen(PORT, () => {
      logger.info(`api server listening on port: ${PORT}`);
    });
  } catch (error) {
    logger.error('error starting server', error);
    process.exit(1);
  }
};

main();

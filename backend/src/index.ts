import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT ?? 9000;

const main = async () => {
  try {
    console.info('starting api-server...');

    app.listen(PORT, () => {
      console.info(`api server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error('error starting server', error);
    process.exit(1);
  }
};

main();

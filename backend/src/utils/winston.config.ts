// Purpose: Winston logger configuration.

import { Logger, createLogger, format, transports } from 'winston';

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

const logger: Logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.json(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      let logMessage = message;
      if (Object.keys(meta).length > 0) {
        logMessage += ` ${JSON.stringify(meta, null, 2)}`;
      }
      return `[${timestamp}] ${level}: ${logMessage}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

logger.info('logger initialized');

export default logger;

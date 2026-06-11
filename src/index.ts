import app from './app.js';
import { env, isLocal } from './config/env.js';
import { logger } from './lib/logger.js';

const port = env.PORT || 3000;
const API_URL = isLocal ? `${env.API_BASE_URL}:${port}` : env.API_BASE_URL;

logger.info('Starting server...');

app.listen(port, () => {
  logger.info('Server Started', {
    event: 'SERVER_STARTED',
    url: API_URL,
    port,
    env: env.NODE_ENV,
  });
});

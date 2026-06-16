import express from 'express';
import userRoutes from './features/users/user.routes.js';
import { createSwaggerRouter } from './api/openapi/swagger.js';
import { errorHandler } from './middleware/error.handler.js';
import { requestLogger } from './middleware/request.logger.js';
import { env, isDevelopment } from './config/env.js';
import cors from 'cors';
import { logger } from './lib/logger.js';

const app = express();
const allowedOrigins = isDevelopment
  ? ['http://localhost:5173', 'https://local.spencergariano.dev']
  : ['https://spencergariano.dev', 'https://www.spencergariano.dev'];

app.use(express.json());
app.use(requestLogger);

app.use(
  cors({
    origin: (origin, callback) => {
      const isAllowed = !origin || allowedOrigins.includes(origin);
      if (isAllowed) {
        return callback(null, true);
      }

      logger.warn('[CORS_BLOCKED]', { origin });
      callback(null, false);
    },
  }),
);

//User Api Routes
app.use(`${env.API_PREFIX}/users`, userRoutes);

//Swagger Docs
app.use(`${env.API_PREFIX}/docs`, createSwaggerRouter());

app.use(errorHandler);

export default app;

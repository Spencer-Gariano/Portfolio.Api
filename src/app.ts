import express from 'express';
import userRoutes from './features/users/user.routes.js';
import { createSwaggerRouter } from './api/openapi/swagger.js';
import { errorHandler } from './middleware/error.handler.js';
import { requestLogger } from './middleware/request.logger.js';
import { env } from './config/env.js';

const app = express();

app.use(express.json());
app.use(requestLogger);

//User Api Routes
app.use(`${env.API_PREFIX}/users`, userRoutes);

//Swagger Docs
app.use(`${env.API_PREFIX}/docs`, createSwaggerRouter());

app.use(errorHandler);

export default app;

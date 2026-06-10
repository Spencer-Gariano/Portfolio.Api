import express from 'express';
import userRoutes from './features/users/user.routes.js';
import { createSwaggerRouter } from './api/openapi/swagger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

//User Api Routes
app.use('/users', userRoutes);

//Swagger Docs
app.use('/docs', createSwaggerRouter());

app.use(errorHandler);

export default app;

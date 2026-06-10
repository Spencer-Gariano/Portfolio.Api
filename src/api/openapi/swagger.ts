import express from 'express';
import { generateOpenApi } from './generate.js';
import swaggerUi from 'swagger-ui-express';

export function createSwaggerRouter() {
  const router = express.Router();
  const doc = generateOpenApi();

  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(doc));

  return router;
}

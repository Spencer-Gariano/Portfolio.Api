import { registry } from './registry.js';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import type { OpenApiConfig } from './types.js';
import { registerSchemas } from './schemas.js';
import { env, isDevelopment } from '../../config/env.js';

export function generateOpenApi() {
  const config: OpenApiConfig = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Portfolio API',
      description: `
Demo API Token: portfolio-demo-token\n
Required for POST, PUT, and DELETE operations.
`,
    },
    servers: [
      {
        url: isDevelopment ? env.API_PREFIX : env.API_BASE_URL,
      },
    ],
  };
  registerSchemas();
  return new OpenApiGeneratorV3(registry.definitions).generateDocument(config);
}

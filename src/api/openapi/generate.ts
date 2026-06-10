import { registry } from './registry.js';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import type { OpenApiConfig } from './types.js';
import { registerSchemas } from './schemas.js';

export function generateOpenApi() {
  const config: OpenApiConfig = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Portfolio API',
    },
  };
  registerSchemas();
  return new OpenApiGeneratorV3(registry.definitions).generateDocument(config);
}

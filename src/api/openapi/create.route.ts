// api/openapi/createRoute.ts
import { z } from 'zod';
import { registry } from './registry.js';
import type { HttpMethod, IRouteRequest } from './types.js';
import type { ResponseConfig, RouteConfig } from '@asteasolutions/zod-to-openapi';

export interface ICreateRouteConfig {
  method: HttpMethod;
  path: string;
  summary?: string;
  request?: IRouteRequest;
  security?: Array<Record<string, string[]>>;
  responses: {
    [statusCode: string]: ResponseConfig;
  };
}

function toOpenAPIPath(path: string) {
  return path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
}

export function createRoute(config: ICreateRouteConfig) {
  const { method, request, responses, summary, security } = config;
  const openApiPath = toOpenAPIPath(config.path);

  const configRequest: RouteConfig['request'] = { ...request };
  const configResponse: RouteConfig['responses'] = { ...responses };

  registry.registerPath({
    method,
    path: openApiPath,
    ...(summary ? { summary } : {}),
    ...(security ? { security } : {}),
    request: configRequest,
    responses: configResponse,
  });
}

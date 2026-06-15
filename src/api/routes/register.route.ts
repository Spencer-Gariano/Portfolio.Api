// api/routes/createPost.ts

import type { RequestHandler } from 'express';
import { createRoute } from '../openapi/create.route.js';
import type { FeatureRouter, IRouteDefinition } from '../openapi/types.js';

/**
 * Registers an API route with both Express and the OpenAPI registry.
 *
 * This helper acts as the single source of truth for a route by:
 * - registering the runtime Express handler
 * - registering the OpenAPI contract/documentation
 * - keeping route metadata colocated with the implementation
 *
 * The route is mounted on the provided feature router and automatically
 * prefixes the OpenAPI path using the feature's base path.
 *
 * @param feature Feature router containing the Express router instance
 * and OpenAPI route prefix (e.g. '/users').
 *
 * @param config Route definition containing the HTTP method, relative path,
 * request/response schemas, and OpenAPI metadata.
 *
 * @param handler Express request handler executed for the route.
 */
export function registerRoute(
  feature: FeatureRouter,
  config: IRouteDefinition,
  handler: RequestHandler,
) {
  const { method, path, summary, request, responses } = config;

  // Register express route
  const register = feature.router[method].bind(feature.router);
  register(path, handler);

  // OpenAPI registration
  // Full OpenAPI path
  const fullPath = path === '/' ? feature.prefix : `${feature.prefix}${path}`;

  createRoute({
    method,
    path: fullPath,
    ...(summary ? { summary } : {}),
    ...(request ? { request } : {}),
    responses: responses,
  });
}

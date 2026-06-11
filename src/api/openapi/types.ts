import type { ResponseConfig, ZodRequestBody } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type OpenApiServer = {
  url: string;
};

export type OpenApiConfig = {
  openapi: string;
  info: {
    title: string;
    description?: string;
    termsOfService?: string;
    version: string;
  };
  servers: OpenApiServer[];
};

export type ResponseInput = {
  description: string;
  schema?: z.ZodTypeAny;
};

export interface IRouteRequest {
  body?: ZodRequestBody;
  params?: z.ZodObject<any>;
  query?: z.ZodObject<any>;
  cookies?: z.ZodObject<any>;
  headers?: z.ZodObject<any>[] | z.ZodType<unknown>[];
}

export interface IRouteDefinition {
  method: HttpMethod;
  path: string;
  summary?: string;
  request?: IRouteRequest;
  responses: {
    [statusCode: string]: ResponseConfig;
  };
}

export type FeatureRouter = {
  prefix: string;
  router: ReturnType<typeof import('express').Router>;
};

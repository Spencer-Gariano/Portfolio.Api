import type { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { logger } from '../lib/logger.js';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: z.treeifyError(err),
    });
  }

  // Generic fallback
  logger.error('Unhandled server error', {
    error: err,
    method: req.method,
    path: req.path,
  });

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}

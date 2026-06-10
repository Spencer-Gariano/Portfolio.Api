import type { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: z.treeifyError(err),
    });
  }

  // Generic fallback
  console.error(err);

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}

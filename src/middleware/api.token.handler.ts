import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';

export const apiTokenHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-api-token');

  if (!token) {
    return res.status(401).json({
      message: 'Missing API token',
    });
  }

  if (token !== env.API_TOKEN) {
    return res.status(401).json({
      message: 'Invalid API token',
    });
  }

  next();
};

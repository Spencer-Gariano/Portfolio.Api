import pino from 'pino';
import { isProduction } from '../config/env.js';

export interface ILogger {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

class PinoLogger implements ILogger {
  private logger = pino({
    level: isProduction ? 'info' : 'debug',
  });
  info(message: string, meta?: Record<string, unknown>) {
    this.logger.info(meta, message);
  }
  warn(message: string, meta?: Record<string, unknown>) {
    this.logger.warn(meta, message);
  }
  error(message: string, meta?: Record<string, unknown>) {
    this.logger.error(meta, message);
  }
}

export const logger = new PinoLogger();

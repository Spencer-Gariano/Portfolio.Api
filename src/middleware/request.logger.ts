import morgan from 'morgan';
import { isDevelopment } from '../config/env.js';

const format = isDevelopment ? 'dev' : 'combined';

export const requestLogger = morgan(format);

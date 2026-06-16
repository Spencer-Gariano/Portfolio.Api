import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DATABASE_URL: process.env.DATABASE_URL!,
  API_BASE_URL: process.env.API_BASE_URL!,
  API_TOKEN: process.env.API_TOKEN!,
  API_PREFIX: process.env.API_PREFIX ?? '',
  PORT: process.env.PORT!,
  LOCAL: process.env.LOCAL ?? 'false',
};
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isLocal = isDevelopment && env.LOCAL === 'true';

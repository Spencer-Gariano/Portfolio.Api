import { Router } from 'express';

export function createFeatureRouter(prefix: string) {
  return {
    prefix,
    router: Router(),
  };
}

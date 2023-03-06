import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    next();
  }
}

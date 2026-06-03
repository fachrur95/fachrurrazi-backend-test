import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

interface RateLimiter {
  count: number;
  resetTimer: number;
}

@Injectable()
export class RateLimiterGuard implements CanActivate {
  private storage = new Map<string, RateLimiter>();

  private readonly TTL = 10000;
  private readonly LIMIT = 10;

  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    const ip =
      (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown';

    const now = Date.now();

    let record = this.storage.get(ip);

    if (!record || now > record.resetTimer) {
      record = {
        count: 1,
        resetTimer: now + this.TTL,
      };

      this.storage.set(ip, record);
      return true;
    }

    record.count++;

    if (record.count > this.LIMIT) {
      throw new BadRequestException({
        status: false,
        message: 'You are limited to hit this endpoint!',
      });
    }

    return true;
  }
}

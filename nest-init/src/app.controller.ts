import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RateLimiterGuard } from './limiter.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(RateLimiterGuard)
  @Get('hc')
  getHello() {
    return this.appService.getHealthCheck();
  }
}

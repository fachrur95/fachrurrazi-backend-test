import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): { status: boolean; message: string } {
    return { status: true, message: 'This endpoint is OK!' };
  }
}

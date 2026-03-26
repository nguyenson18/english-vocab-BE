import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      success: true,
      message: 'English vocab API is running',
      timestamp: new Date().toISOString(),
    };
  }
}

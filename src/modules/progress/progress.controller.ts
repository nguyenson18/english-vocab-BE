import { Controller, Get } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('overview')
  async getOverview() {
    const data = await this.progressService.getOverview();
    return {
      success: true,
      message: 'Progress overview fetched successfully',
      data,
    };
  }

  @Get('wrong-words')
  async getWrongWords() {
    const data = await this.progressService.getWrongWords();
    return {
      success: true,
      message: 'Wrong words fetched successfully',
      data,
    };
  }

  @Get('review-due')
  async getReviewDue() {
    const data = await this.progressService.getReviewDue();
    return {
      success: true,
      message: 'Review due words fetched successfully',
      data,
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ResponseMessage } from '../../common/interceptors/response-message.decorator';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('overview')
  @ResponseMessage('Progress overview fetched successfully')
  getOverview() {
    return this.progressService.getOverview();
  }

  @Get('wrong-words')
  @ResponseMessage('Wrong words fetched successfully')
  getWrongWords() {
    return this.progressService.getWrongWords();
  }

  @Get('review-due')
  @ResponseMessage('Review due words fetched successfully')
  getReviewDue() {
    return this.progressService.getReviewDue();
  }
}

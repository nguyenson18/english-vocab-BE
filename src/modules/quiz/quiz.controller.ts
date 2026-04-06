import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseMessage } from '../../common/interceptors/response-message.decorator';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('start')
  @ResponseMessage('Quiz generated successfully')
  startQuiz(@Body() startQuizDto: StartQuizDto) {
    return this.quizService.startQuiz(startQuizDto);
  }

  @Post('submit')
  @ResponseMessage('Quiz submitted successfully')
  submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    return this.quizService.submitQuiz(submitQuizDto);
  }

  @Get('history')
  @ResponseMessage('Quiz history fetched successfully')
  getHistory() {
    return this.quizService.getHistory();
  }

  @Get('history/:id')
  @ResponseMessage('Quiz history detail fetched successfully')
  getHistoryDetail(@Param('id') id: string) {
    return this.quizService.getHistoryDetail(id);
  }
}

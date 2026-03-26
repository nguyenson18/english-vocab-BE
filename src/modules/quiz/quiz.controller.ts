import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('start')
  async startQuiz(@Body() startQuizDto: StartQuizDto) {
    const data = await this.quizService.startQuiz(startQuizDto);
    return {
      success: true,
      message: 'Quiz generated successfully',
      data,
    };
  }

  @Post('submit')
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    const data = await this.quizService.submitQuiz(submitQuizDto);
    return {
      success: true,
      message: 'Quiz submitted successfully',
      data,
    };
  }

  @Get('history')
  async getHistory() {
    const data = await this.quizService.getHistory();
    return {
      success: true,
      message: 'Quiz history fetched successfully',
      data,
    };
  }

  @Get('history/:id')
  async getHistoryDetail(@Param('id') id: string) {
    const data = await this.quizService.getHistoryDetail(id);
    return {
      success: true,
      message: 'Quiz history detail fetched successfully',
      data,
    };
  }
}

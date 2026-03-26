import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class QuizAnswerItemDto {
  @IsUUID()
  vocabularyId: string;

  @IsString()
  userAnswer: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}

export class SubmitQuizDto {
  @IsUUID()
  topicId: string;

  @IsString()
  @IsOptional()
  quizType?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerItemDto)
  answers: QuizAnswerItemDto[];
}

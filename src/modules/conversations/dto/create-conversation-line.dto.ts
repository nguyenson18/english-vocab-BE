import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateConversationLineDto {
  @IsString()
  speaker: string;

  @IsInt()
  @Min(1)
  orderIndex: number;

  @IsString()
  englishText: string;

  @IsString()
  vietnameseText: string;

  @IsOptional()
  @IsString()
  note?: string;
}
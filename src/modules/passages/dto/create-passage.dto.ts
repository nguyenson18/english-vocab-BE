import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePassageDto {
  @IsUUID()
  topicId: string;

  @IsString()
  @MaxLength(150)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  englishContent: string;

  @IsString()
  vietnameseContent: string;
}

import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateVocabularyDto {
  @IsUUID()
  topicId: string;

  @IsString()
  @MaxLength(150)
  englishWord: string;

  @IsString()
  @MaxLength(255)
  vietnameseMeaning: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  pronunciation?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  partOfSpeech?: string;

  @IsOptional()
  @IsString()
  exampleEn?: string;

  @IsOptional()
  @IsString()
  exampleVi?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

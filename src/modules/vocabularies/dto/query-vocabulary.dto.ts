import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryVocabularyDto {
  @IsOptional()
  @IsUUID()
  topicId?: string;

  @IsOptional()
  @IsString()
  keyword?: string;
}

import { IsHexColor, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsHexColor()
  color?: string;
}

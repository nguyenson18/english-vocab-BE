import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Post()
  async create(@Body() createVocabularyDto: CreateVocabularyDto) {
    const data = await this.vocabulariesService.create(createVocabularyDto);
    return {
      success: true,
      message: 'Vocabulary created successfully',
      data,
    };
  }

  @Get()
  async findAll(@Query() query: QueryVocabularyDto) {
    const data = await this.vocabulariesService.findAll(query);
    return {
      success: true,
      message: 'Vocabularies fetched successfully',
      data,
    };
  }

  @Get('topic/:topicId')
  async findByTopic(@Param('topicId') topicId: string) {
    const data = await this.vocabulariesService.findByTopic(topicId);
    return {
      success: true,
      message: 'Topic vocabularies fetched successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.vocabulariesService.findOne(id);
    return {
      success: true,
      message: 'Vocabulary fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    const data = await this.vocabulariesService.update(id, updateVocabularyDto);
    return {
      success: true,
      message: 'Vocabulary updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.vocabulariesService.remove(id);
    return {
      success: true,
      message: 'Vocabulary deleted successfully',
      data,
    };
  }
}

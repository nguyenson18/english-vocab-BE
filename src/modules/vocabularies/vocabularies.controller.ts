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
import { ResponseMessage } from '../../common/interceptors/response-message.decorator';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { QueryVocabularyDto } from './dto/query-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabulariesService } from './vocabularies.service';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Post()
  @ResponseMessage('Vocabulary created successfully')
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabulariesService.create(createVocabularyDto);
  }

  @Get()
  @ResponseMessage('Vocabularies fetched successfully')
  findAll(@Query() query: QueryVocabularyDto) {
    return this.vocabulariesService.findAll(query);
  }

  @Get('topic/:topicId')
  @ResponseMessage('Topic vocabularies fetched successfully')
  findByTopic(@Param('topicId') topicId: string) {
    return this.vocabulariesService.findByTopic(topicId);
  }

  @Get(':id')
  @ResponseMessage('Vocabulary fetched successfully')
  findOne(@Param('id') id: string) {
    return this.vocabulariesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Vocabulary updated successfully')
  update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    return this.vocabulariesService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  @ResponseMessage('Vocabulary deleted successfully')
  remove(@Param('id') id: string) {
    return this.vocabulariesService.remove(id);
  }
}

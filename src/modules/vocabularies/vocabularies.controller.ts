import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
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

  @Patch(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  @ResponseMessage('Vocabulary image uploaded successfully')
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.vocabulariesService.uploadImage(id, file);
  }

  @Delete(':id/image')
  @ResponseMessage('Vocabulary image removed successfully')
  removeImage(@Param('id') id: string) {
    return this.vocabulariesService.removeImage(id);
  }

  @Delete(':id')
  @ResponseMessage('Vocabulary deleted successfully')
  remove(@Param('id') id: string) {
    return this.vocabulariesService.remove(id);
  }
}
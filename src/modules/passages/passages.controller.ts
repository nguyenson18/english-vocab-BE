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
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';
import { PassagesService } from './passages.service';

@Controller('passages')
export class PassagesController {
  constructor(private readonly passagesService: PassagesService) {}

  @Post()
  @ResponseMessage('Passage created successfully')
  create(@Body() createPassageDto: CreatePassageDto) {
    return this.passagesService.create(createPassageDto);
  }

  @Get()
  @ResponseMessage('Passages fetched successfully')
  findAll(@Query('topicId') topicId?: string) {
    return this.passagesService.findAll(topicId);
  }

  @Get(':id')
  @ResponseMessage('Passage fetched successfully')
  findOne(@Param('id') id: string) {
    return this.passagesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Passage updated successfully')
  update(@Param('id') id: string, @Body() updatePassageDto: UpdatePassageDto) {
    return this.passagesService.update(id, updatePassageDto);
  }

  @Delete(':id')
  @ResponseMessage('Passage deleted successfully')
  remove(@Param('id') id: string) {
    return this.passagesService.remove(id);
  }
}

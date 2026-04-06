import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseMessage } from '../../common/interceptors/response-message.decorator';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ResponseMessage('Topic created successfully')
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @ResponseMessage('Topics fetched successfully')
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Topic fetched successfully')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Topic updated successfully')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  @ResponseMessage('Topic deleted successfully')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}

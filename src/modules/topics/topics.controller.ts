import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    const data = await this.topicsService.create(createTopicDto);
    return {
      success: true,
      message: 'Topic created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.topicsService.findAll();
    return {
      success: true,
      message: 'Topics fetched successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.topicsService.findOne(id);
    return {
      success: true,
      message: 'Topic fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    const data = await this.topicsService.update(id, updateTopicDto);
    return {
      success: true,
      message: 'Topic updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.topicsService.remove(id);
    return {
      success: true,
      message: 'Topic deleted successfully',
      data,
    };
  }
}

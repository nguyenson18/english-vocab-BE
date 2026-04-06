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
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ResponseMessage('Conversation created successfully')
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Get()
  @ResponseMessage('Conversations fetched successfully')
  findAll(@Query('topicId') topicId?: string) {
    return this.conversationsService.findAll(topicId);
  }

  @Get(':id')
  @ResponseMessage('Conversation fetched successfully')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Conversation updated successfully')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @ResponseMessage('Conversation deleted successfully')
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(id);
  }
}
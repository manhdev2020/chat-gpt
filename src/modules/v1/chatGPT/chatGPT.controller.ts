import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatGPTService } from './chatGPT.service';
import { AskDto } from './dto/ask.dto';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';

@ApiTags('ChatGPT')
@Controller('chatGPT')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}
  @Post()
  public async chat(@Body() askDto: AskDto) {
    return await this.chatGPTService.chat(askDto);
  }

  @Post('room')
  public async createRoomChat(@Body() createRoomChatDto: CreateRoomChatDto) {
    return await this.chatGPTService.createRoomChat(createRoomChatDto);
  }
}

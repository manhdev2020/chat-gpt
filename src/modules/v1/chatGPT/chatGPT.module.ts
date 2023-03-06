import { MongooseModule } from '@nestjs/mongoose';
import { ChatGPTService } from './chatGPT.service';
import { Module } from '@nestjs/common';
import { ChatGPTController } from './chatGPT.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { RoomChat, RoomChatSchema } from './schemas/roomChat.schema';
import { RedisService } from '@root/common/utils/cache.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: RoomChat.name, schema: RoomChatSchema },
    ]),
  ],
  controllers: [ChatGPTController],
  providers: [ChatGPTService, RedisService],
})
export class ChatGPTModule {}

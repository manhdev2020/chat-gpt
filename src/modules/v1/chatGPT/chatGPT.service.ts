import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AskDto } from './dto/ask.dto';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { PaginateModel } from 'mongoose';
import { RoomChat, RoomChatDocument } from './schemas/roomChat.schema';
import { RedisService } from '@root/common/utils/cache.util';

@Injectable()
export class ChatGPTService {
  chatGPTKey: string;
  api: string;
  model: string;
  temperature: number;
  max_token: number;
  configuration: Configuration;
  openai: OpenAIApi;

  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: PaginateModel<MessageDocument>,

    @InjectModel(RoomChat.name)
    private readonly roomChatModel: PaginateModel<RoomChatDocument>,

    private readonly configService: ConfigService,

    private readonly redisService: RedisService,
  ) {
    this.configuration = new Configuration({
      apiKey: configService.get<string>('chatGPT.key'),
    });

    this.openai = new OpenAIApi(this.configuration);

    this.model = configService.get<string>('chatGPT.model');
  }

  public async createRoomChat(createRoomChatDto: CreateRoomChatDto) {
    return await this.roomChatModel.create({
      createRoomChatDto,
    });
  }

  public async chat(askDto: AskDto) {
    const { ask, roomId } = askDto;
    let checkDataCache = false;

    const data = await this.redisService.getOrSet(
      ask,
      async () => {
        checkDataCache = true;
        return await this.handleChatMessage(askDto);
      },
      1000,
    );

    if (!checkDataCache) {
      await this.messageModel.create({
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: ask,
        roomId,
      });

      await this.messageModel.create({
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: data.content,
        roomId,
      });
    }

    return data;
  }

  private async handleChatMessage(askDto: AskDto) {
    const { ask, roomId } = askDto;

    await this.messageModel.create({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: ask,
      roomId,
    });

    const messages = await this.messageModel
      .find({
        roomId,
      })
      .select('role content');

    const convertMessages = messages.map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    });

    console.log({ convertMessages });

    const completion = await this.openai.createChatCompletion({
      model: this.model,
      messages: convertMessages,
    });

    await this.messageModel.create({
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: completion.data.choices[0].message.content,
      roomId,
    });

    return completion.data.choices[0].message;
  }
}

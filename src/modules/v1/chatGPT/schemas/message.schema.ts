import { ChatCompletionRequestMessageRoleEnum } from 'openai/dist/api';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@root/common/base/base.schema';
import * as paginate from 'mongoose-paginate-v2';
import { Types, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  timestamps: {
    currentTime: () => new Date(),
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toObject: { virtuals: true },
})
export class Message extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'RoomChat' })
  roomId: Types.ObjectId;

  @Prop({ enum: ChatCompletionRequestMessageRoleEnum })
  role: ChatCompletionRequestMessageRoleEnum;

  @Prop()
  content: string;

  @Prop({ default: false })
  isSystem: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.plugin(paginate);

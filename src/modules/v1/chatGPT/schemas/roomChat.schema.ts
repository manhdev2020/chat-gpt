import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@root/common/base/base.schema';
import * as paginate from 'mongoose-paginate-v2';

export type RoomChatDocument = RoomChat & Document;

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
export class RoomChat extends BaseSchema {
  @Prop({ default: 'New chat' })
  name: string;
}

export const RoomChatSchema = SchemaFactory.createForClass(RoomChat);

RoomChatSchema.plugin(paginate);

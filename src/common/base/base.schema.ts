import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export abstract class BaseSchema extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdById?: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedById?: Types.ObjectId;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedById?: Types.ObjectId;

  @Prop()
  updatedAt?: Date;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({
    required: true,
    ref: 'User',
    type: [NativeSchema.Types.ObjectId],
    unique: false,
  })
  participants: [NativeSchema.Types.ObjectId];

  @Prop({
    ref: 'ChatMessage',
    type: [NativeSchema.Types.ObjectId],
    unique: false,
    default: [],
  })
  messages: [NativeSchema.Types.ObjectId];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type ChatMessageDocument = HydratedDocument<ChatMessages>;

@Schema({
  timestamps: true,
})
export class ChatMessages {
  @Prop({
    required: true,
  })
  text: string;

  @Prop({
    required: true,
    ref: 'User',
    type: NativeSchema.Types.ObjectId,
  })
  author: NativeSchema.Types.ObjectId;

  @Prop({
    required: true,
    ref: 'Chat',
    type: NativeSchema.Types.ObjectId,
  })
  chatId: NativeSchema.Types.ObjectId;
}

export const ChatMessagesSchema = SchemaFactory.createForClass(ChatMessages);

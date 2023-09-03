import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

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

ChatMessagesSchema.plugin(paginate);

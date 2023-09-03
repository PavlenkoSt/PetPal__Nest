import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({
    required: true,
    ref: 'User',
    type: [NativeSchema.Types.ObjectId],
    unique: false,
  })
  participants: [NativeSchema.Types.ObjectId];

  @Prop({
    ref: 'ChatMessages',
    type: NativeSchema.Types.ObjectId,
    unique: false,
    default: null,
    required: false,
  })
  lastMessage: NativeSchema.Types.ObjectId | null;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

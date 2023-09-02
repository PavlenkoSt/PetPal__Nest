import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatMessagesRepository } from './chat-messages.repository';
import {
  ChatMessages,
  ChatMessagesSchema,
} from './schemas/chat-messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChatMessages.name,
        schema: ChatMessagesSchema,
      },
    ]),
  ],
  providers: [ChatMessagesRepository],
  exports: [ChatMessagesRepository],
})
export class ChatMessagesModule {}

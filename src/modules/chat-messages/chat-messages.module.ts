import { Module } from '@nestjs/common';

import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesRepository } from './chat-messages.repository';

@Module({
  providers: [ChatMessagesService, ChatMessagesRepository],
  exports: [ChatMessagesService, ChatMessagesRepository],
})
export class ChatMessagesModule {}

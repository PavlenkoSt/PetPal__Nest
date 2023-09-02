import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { AuthModule } from '../auth/auth.module';
import { ChatsRepository } from './chats.repository';
import { Chat, ChatSchema } from './schemas/chats.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
  ],
  providers: [ChatsGateway, ChatsService, ChatsRepository],
})
export class ChatsModule {}

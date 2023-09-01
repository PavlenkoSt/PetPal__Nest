import { Module } from '@nestjs/common';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}

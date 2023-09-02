import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';
import { ChatsRepository } from './chats.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { INVALID_CREDENTIALS } from '../auth/auth.contants';
import { CHAT_ALREADY_EXIST } from './chats.contants';

@Injectable()
export class ChatsService {
  constructor(
    private readonly authService: AuthService,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const auth = socket.handshake.auth.token;

    if (!auth || !auth.includes('Bearer'))
      throw new WsException(INVALID_CREDENTIALS);

    const token = auth.split(' ')[1];

    const user = this.authService.getUserFromAuthenticationToken(token);

    if (!user) throw new WsException(INVALID_CREDENTIALS);

    return user;
  }

  async createChat(dto: CreateChatDto) {
    const exist = await this.chatsRepository.getChatWithUsers(dto);

    if (exist) throw new WsException(CHAT_ALREADY_EXIST);

    return await this.chatsRepository.createChat(dto);
  }
}

import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatsService {
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const auth = socket.handshake.auth.token;

    if (!auth || !auth.includes('Bearer'))
      throw new WsException('Invalid credentials.');

    const token = auth.split(' ')[1];

    const user = this.authService.getUserFromAuthenticationToken(token);

    if (!user) throw new WsException('Invalid credentials.');

    return user;
  }
}

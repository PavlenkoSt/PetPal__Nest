import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { ChatsService } from './chats.service';
import { CHAT_REQUEST_EVENTS, CHAT_RESPONSE_EVENTS } from './chats.ws-events';
import {
  CHAT_CONNECTED,
  CHAT_CONNECTION_ERROR,
  CHAT_CREATION_ERROR,
  CHAT_DISCONNECTED,
} from './chats.contants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/chats',
  transport: ['websocket'],
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  private readonly clientsSocketIdToUserId = new Map<string, string>();

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage(CHAT_REQUEST_EVENTS.GET_CHATS)
  handleChats(client: Socket, payload: any): string {
    const user = this.clientsSocketIdToUserId.get(client.id);

    console.log('====================================');
    console.log('userId in test', user);
    console.log('====================================');

    return 'Hello world!';
  }

  @SubscribeMessage(CHAT_REQUEST_EVENTS.GET_CHATS_MESSAGE)
  handleChatMessages() {}

  @SubscribeMessage(CHAT_REQUEST_EVENTS.CREATE_CHAT)
  async handleJoinRoom(client: Socket, withUserId: string) {
    try {
      const userId = this.clientsSocketIdToUserId.get(client.id);

      const chat = await this.chatsService.createChat({
        userId: userId,
        withUserId,
      });

      return client.emit(
        CHAT_RESPONSE_EVENTS.CREATED_CHAT,
        JSON.stringify(chat),
      );
    } catch (e) {
      client.emit(
        CHAT_RESPONSE_EVENTS.ERROR,
        `${CHAT_CREATION_ERROR} | ${e.message}`,
      );
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const user = await this.chatsService.getUserFromSocket(client);

      this.clientsSocketIdToUserId.set(client.id, String(user.id));

      return client.send(CHAT_CONNECTED);
    } catch (e) {
      client.emit(
        CHAT_RESPONSE_EVENTS.ERROR,
        `${CHAT_CONNECTION_ERROR} | ${e.message}`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    this.clientsSocketIdToUserId.delete(client.id);

    return client.send(CHAT_DISCONNECTED);
  }
}

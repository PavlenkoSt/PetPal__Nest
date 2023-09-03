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
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsWsMemory } from './chats.ws-memory';
import { PaginationDto } from 'src/utilts/dto/PaginationDto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/chats',
  transport: ['websocket'],
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatsWsMemory: ChatsWsMemory,
  ) {}

  @SubscribeMessage(CHAT_REQUEST_EVENTS.GET_CHATS)
  async handleGetChats(client: Socket) {
    try {
      const userId = this.chatsWsMemory.getUserIdByClientId(client.id);

      const chats = await this.chatsService.getChatsByUserId(userId);

      return client.emit(CHAT_RESPONSE_EVENTS.RECEIVE_CHATS, chats);
    } catch (e) {
      client.emit(
        CHAT_RESPONSE_EVENTS.ERROR,
        e.message || 'Something went wrong',
      );
    }
  }

  @SubscribeMessage(CHAT_REQUEST_EVENTS.SEND_MESSAGE)
  async handleSendMessage(client: Socket, data: string) {
    try {
      const userId = this.chatsWsMemory.getUserIdByClientId(client.id);

      const parsedData: SendMessageDto = JSON.parse(data);

      const { message, chatId } = parsedData;

      const created = await this.chatsService.sendMessage({
        author: userId,
        text: message,
        chatId,
      });

      const subscriberIds: string[] = this.chatsWsMemory.getChatById(chatId);

      if (subscriberIds?.length) {
        this.chatsWsMemory.emitForClients(
          subscriberIds,
          CHAT_RESPONSE_EVENTS.RECEIVE_MESSAGE,
          JSON.stringify(created),
        );
      }
    } catch (e) {
      client.emit(CHAT_RESPONSE_EVENTS.ERROR, e.message);
    }
  }

  @SubscribeMessage(CHAT_REQUEST_EVENTS.GET_MESSAGES)
  async handleChatMessages(client: Socket, message: string) {
    try {
      const parsed: PaginationDto & { chatId: string } = JSON.parse(message);

      const { chatId, ...pagination } = parsed;

      const result = await this.chatsService.getMessages(chatId, pagination);

      client.emit(
        CHAT_RESPONSE_EVENTS.RECEIVE_MESSAGES,
        JSON.stringify(result),
      );
    } catch (e) {
      client.emit(
        CHAT_RESPONSE_EVENTS.ERROR,
        e.message || 'Something went wrong',
      );
    }
  }

  @SubscribeMessage(CHAT_REQUEST_EVENTS.CREATE_CHAT)
  async handleCreateChat(client: Socket, withUserId: string) {
    try {
      const userId = this.chatsWsMemory.getUserIdByClientId(client.id);

      const chat = await this.chatsService.createChat({
        userId: userId,
        withUserId,
      });

      const toNotify = [client.id];

      this.chatsWsMemory.addChatsToListen(String(chat.id), client.id);

      const withUserClientId =
        this.chatsWsMemory.getUserIdByClientId(withUserId);

      if (withUserClientId) {
        this.chatsWsMemory.addChatsToListen(String(chat.id), withUserClientId);
        toNotify.push(withUserClientId);
      }

      this.chatsWsMemory.emitForClients(
        toNotify,
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

      const userChats = await this.chatsService.getChatsByUserId(user.id);

      this.chatsWsMemory.registerClient(
        client,
        user.id,
        userChats.map((chat) => String(chat.id)),
      );

      return client.send(CHAT_CONNECTED);
    } catch (e) {
      client.emit(
        CHAT_RESPONSE_EVENTS.ERROR,
        `${CHAT_CONNECTION_ERROR} | ${e.message}`,
      );
    }
  }

  handleDisconnect(client: Socket) {
    try {
      this.chatsWsMemory.unregisterClient(client);

      return client.send(CHAT_DISCONNECTED);
    } catch (e) {
      client.emit(CHAT_RESPONSE_EVENTS.ERROR, e.message);
    }
  }
}

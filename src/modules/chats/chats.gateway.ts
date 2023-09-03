import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { ChatsService } from './chats.service';
import { CHAT_REQUEST_EVENTS, CHAT_RESPONSE_EVENTS } from './chats.ws-events';
import {
  CHAT_CONNECTED,
  CHAT_CONNECTION_ERROR,
  CHAT_CREATION_ERROR,
  CHAT_DISCONNECTED,
  INVALID_PARAMETERS,
} from './chats.contants';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsWsMemory } from './chats.ws-memory';
import { PaginationDto } from 'src/utilts/dto/PaginationDto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { isMongoId, validateOrReject } from 'class-validator';

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
      const parsed: SendMessageDto = JSON.parse(data);

      if (!isMongoId(parsed.chatId) || !parsed.message)
        throw new WsException(INVALID_PARAMETERS);

      const userId = this.chatsWsMemory.getUserIdByClientId(client.id);

      const { message, chatId } = parsed;

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

      if (!isMongoId(parsed.chatId)) throw new WsException(INVALID_PARAMETERS);

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
      if (!isMongoId(withUserId)) throw new WsException(INVALID_PARAMETERS);

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

  @SubscribeMessage(CHAT_REQUEST_EVENTS.DELETE_MESSAGE)
  async deleteMessage(client: Socket, message: string) {
    try {
      const parsed: DeleteMessageDto = JSON.parse(message);

      if (!isMongoId(parsed.messageId) || !isMongoId(parsed.chatId))
        throw new WsException(INVALID_PARAMETERS);

      const userId = this.chatsWsMemory.getUserIdByClientId(client.id);

      const deleted = await this.chatsService.deleteMessage(
        parsed.chatId,
        parsed.messageId,
        userId,
      );

      const subscribers = this.chatsWsMemory.getChatById(parsed.chatId);

      if (subscribers?.length) {
        this.chatsWsMemory.emitForClients(
          subscribers,
          CHAT_RESPONSE_EVENTS.DELETED_MESSAGE,
          JSON.stringify(deleted),
        );
      }
    } catch (e) {
      client.emit(CHAT_RESPONSE_EVENTS.ERROR, e.message);
    }
  }

  async handleConnection(client: Socket) {
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

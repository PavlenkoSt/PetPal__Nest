import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { CHAT_RESPONSE_EVENTS } from './chats.ws-events';

@Injectable()
export class ChatsWsMemory {
  private readonly clientsSocketIdToUserId = new Map<string, string>();
  private readonly chatsToListen = new Map<string, string[]>();
  private readonly connectedClients = new Map<string, Socket>();

  registerClient(client: Socket, userId: string, chatIds: string[]) {
    chatIds.forEach((id) => {
      this.addChatsToListen(id, client.id);
    });

    this.clientsSocketIdToUserId.set(client.id, userId);
    this.connectedClients.set(client.id, client);
  }

  unregisterClient(client: Socket) {
    this.clientsSocketIdToUserId.delete(client.id);
    this.connectedClients.delete(client.id);
    this.clearClientIdFromChats(client.id);
  }

  getUserIdByClientId(clientId: string) {
    return this.clientsSocketIdToUserId.get(clientId);
  }

  getChatById(id: string) {
    return this.chatsToListen.get(id);
  }

  addChatsToListen(chatId: string, clientId: string) {
    if (this.chatsToListen.has(chatId)) {
      const currentUserIds = this.chatsToListen.get(chatId);

      this.chatsToListen.set(chatId, [
        ...currentUserIds.filter((id) => id !== clientId),
        clientId,
      ]);
    } else {
      this.chatsToListen.set(chatId, [clientId]);
    }
  }

  clearClientIdFromChats(clientId: string) {
    this.chatsToListen.forEach((clientIds, key) => {
      const existInThisChat = clientIds.find((id) => id === clientId);

      if (existInThisChat) {
        this.chatsToListen.set(
          key,
          clientIds.filter((id) => id !== clientId),
        );
      }
    });
  }

  emitForClients(
    clientIds: string[],
    event: CHAT_RESPONSE_EVENTS,
    message: string,
  ) {
    if (!clientIds.length) return;

    clientIds.forEach((id) => {
      const client = this.connectedClients.get(id);

      if (!client) return;

      client.emit(event, message);
    });
  }
}

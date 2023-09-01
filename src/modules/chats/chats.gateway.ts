import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatsService } from './chats.service';

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

  @SubscribeMessage('test')
  handleMessage(client: Socket, payload: any): string {
    const user = this.clientsSocketIdToUserId.get(client.id);

    console.log('====================================');
    console.log('userId in test', user);
    console.log('====================================');

    return 'Hello world!';
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, room: string) {
    // Handle joining a room
    // socket.join(room);
    // if (!this.rooms[room]) {
    //   this.rooms[room] = [];
    // }
    // this.rooms[room].push(socket.id);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(socket: Socket, room: string) {
    // Handle leaving a room
    // socket.leave(room);
    // this.rooms[room] = this.rooms[room].filter((id) => id !== socket.id);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.chatsService.getUserFromSocket(client);

    this.clientsSocketIdToUserId.set(client.id, String(user.id));

    return 'connected';
  }

  handleDisconnect(client: Socket) {
    this.clientsSocketIdToUserId.delete(client.id);

    return 'disconnected';
  }
}

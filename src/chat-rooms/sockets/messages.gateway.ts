import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  websocketEvents,
  websocketNamespace,
  websocketRooms,
} from '../constants';
import { ChatMessageEntity } from '../entities/chat-message.entity';
import { ChatMessageModel } from '../models/chat-message.model';

@WebSocketGateway(80, { namespace: websocketNamespace })
export class MessagesGateway {
  @WebSocketServer()
  private readonly server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('join_messages_room')
  async handleJoinMessagesRoom(
    @ConnectedSocket() socket: Socket,
    @IAM() iam: UserEntity,
  ): Promise<void> {
    await socket.join(websocketRooms.messagesRoom(iam.id));
  }

  async emitNewMessage(
    recipientId: UserEntity['id'],
    message: ChatMessageEntity,
  ): Promise<void> {
    this.server
      .in(websocketRooms.messagesRoom(recipientId))
      .emit(websocketEvents.newMessage, {
        message: ChatMessageModel.createFromEntity(message),
      });
  }
}

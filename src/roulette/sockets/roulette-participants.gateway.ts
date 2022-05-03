import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { websocketNamespace, websocketRooms } from '../constants';

@WebSocketGateway(80, { namespace: websocketNamespace })
export class RouletteParticipantsGateway {
  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('join_private_room')
  async handleJoinPrivateRoom(
    @ConnectedSocket() socket: Socket,
    @IAM() iam: UserEntity,
  ): Promise<void> {
    await socket.join(websocketRooms.roulettePrivateRoom(iam.id));
  }
}

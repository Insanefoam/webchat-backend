import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
  websocketEvents,
  websocketNamespace,
  websocketRooms,
} from '../constants';
import { RouletteSessionMatchEntity } from '../entities/roulette-session-match.entity';
import { RouletteSessionMatchModel } from '../models/roulette-session-match.model';

@WebSocketGateway(80, { namespace: websocketNamespace })
export class RouletteMatchingsGateway {
  @WebSocketServer()
  private readonly server: Server;

  async emitNewMatching(matching: RouletteSessionMatchEntity): Promise<void> {
    this.server
      .in(websocketRooms.roulettePrivateRoom(matching.userId))
      .emit(websocketEvents.newMatch, {
        matching: RouletteSessionMatchModel.createFromEntity(matching),
      });
  }

  async emitMatchingStopped(
    matching: RouletteSessionMatchEntity,
  ): Promise<void> {
    this.server
      .in(websocketRooms.roulettePrivateRoom(matching.userId))
      .emit(websocketEvents.matchStopped, {
        matching: RouletteSessionMatchModel.createFromEntity(matching),
      });
  }
}

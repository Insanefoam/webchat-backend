import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): IncomingMessage {
    const wsContext = context.switchToWs();

    const socket = wsContext.getClient<Socket>();

    const request = socket.request;

    return request;
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (e) {
      const wsContext = context.switchToWs();

      const socket = wsContext.getClient<Socket>();

      socket.disconnect(true);
    }
  }
}

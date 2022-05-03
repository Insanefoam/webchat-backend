import { UserEntity } from 'src/users/entities/user.entity';

declare module 'http' {
  export interface IncomingMessage {
    user?: UserEntity;
  }
}

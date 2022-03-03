import { UserEntity } from 'src/users/entities/user.entity';

declare module 'fastify' {
  export interface FastifyRequest {
    user?: UserEntity;
  }
}

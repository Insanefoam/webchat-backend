import { Module } from '@nestjs/common';
import { UsersQueryResolver } from './resolvers/users.query.resolver';

@Module({
  providers: [UsersQueryResolver],
})
export class UsersModule {}

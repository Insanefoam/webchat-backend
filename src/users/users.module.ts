import { Module } from '@nestjs/common';
import { UsersQueryResolver } from './resolvers/users.query.resolver';
import { UsersService } from './services/users.service';

@Module({
  providers: [UsersQueryResolver, UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersMutationResolver } from './resolvers/users.mutation.resolver';
import { UsersQueryResolver } from './resolvers/users.query.resolver';
import { UsersService } from './services/users.service';

@Module({
  providers: [UsersQueryResolver, UsersMutationResolver, UsersService],
})
export class UsersModule {}

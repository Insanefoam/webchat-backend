import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';

@Resolver()
export class UsersQueryResolver {
  @Query(() => UserModel, { name: 'users_getMe' })
  async getMe(): Promise<UserModel> {
    return {
      id: '12345',
      nickname: 'Insanefoam',
      avatar: 'https://docs.nestjs.com/graphql/resolvers',
    };
  }
}

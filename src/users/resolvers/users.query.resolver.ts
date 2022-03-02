import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

@Resolver()
export class UsersQueryResolver {
  @Query(() => UserModel, { name: 'users_getMe' })
  async getMe(): Promise<UserModel> {
    const data = await UserEntity.query();

    return {
      id: '12345',
      nickname: 'Insanefoam',
      avatar: 'https://docs.nestjs.com/graphql/resolvers',
    };
  }
}

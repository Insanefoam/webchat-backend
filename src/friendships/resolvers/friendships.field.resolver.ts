import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { FriendshipModel } from '../models/friendship.model';

@Resolver(() => FriendshipModel)
export class FriendshipsFieldResolver {
  @ResolveField(() => UserModel, { name: 'firstUser' })
  async resolveFirstUser(
    @Parent() parent: FriendshipModel,
  ): Promise<UserModel> {
    return UserEntity.query().findById(parent.firstUserId);
  }

  @ResolveField(() => UserModel, { name: 'secondUser' })
  async resolveSecondUser(
    @Parent() parent: FriendshipModel,
  ): Promise<UserModel> {
    return UserEntity.query().findById(parent.secondUserId);
  }
}

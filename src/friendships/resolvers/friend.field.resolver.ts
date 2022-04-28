import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { FriendModel } from '../models/friend.model';
import { FriendshipsService } from '../services/friendships.service';

@Resolver(() => FriendModel)
export class FriendFieldResolver {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @ResolveField(() => [UserModel], { name: 'commonFriends' })
  async resolveCommonFriends(
    @Parent() parent: FriendModel,
    @IAM() iam: UserEntity,
  ): Promise<UserModel[]> {
    const entities = await this.friendshipsService.getCommonFriends(
      iam.id,
      parent.id,
    );

    return UserModel.createFromEntity(entities);
  }
}

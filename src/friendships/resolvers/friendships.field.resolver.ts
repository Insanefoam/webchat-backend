import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'libs/insanefoam-dataloader/src/dataloader.decorator';
import { UserByIdDataloader } from 'src/users/dataloaders/user-by-id.dataloader';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { FriendModel } from '../models/friend.model';
import { FriendshipModel } from '../models/friendship.model';

@Resolver(() => FriendshipModel)
export class FriendshipsFieldResolver {
  @ResolveField(() => FriendModel, { name: 'friend' })
  async resolveUser(
    @Parent() parent: FriendshipModel,
    @Loader(UserByIdDataloader)
    usersLoader: DataLoader<string, UserEntity>,
  ): Promise<UserModel> {
    const entity = await usersLoader.load(parent.friendId);

    return UserModel.createFromEntity(entity);
  }
}

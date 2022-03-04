import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'libs/insanefoam-dataloader/src/dataloader.decorator';
import { UserByIdDataloader } from 'src/users/dataloaders/user-by-id.dataloader';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { ChatParticipantModel } from '../models/chat-participant.model';

@Resolver(() => ChatParticipantModel)
export class ChatParticipantsFieldResolver {
  @ResolveField(() => UserModel, { name: 'user' })
  async resolveUser(
    @Parent() parent: ChatParticipantModel,
    @Loader(UserByIdDataloader)
    usersLoader: DataLoader<string, UserEntity>,
  ): Promise<UserModel> {
    const entity = await usersLoader.load(parent.userId);

    return UserModel.createFromEntity(entity);
  }
}

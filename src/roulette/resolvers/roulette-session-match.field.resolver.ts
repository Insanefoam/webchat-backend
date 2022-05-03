import { Loader } from '@app/insanefoam-dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { UserByIdDataloader } from 'src/users/dataloaders/user-by-id.dataloader';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { SessionByIdDataloader } from '../dataloaders/session-by-id.dataloader';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';
import { RouletteSessionMatchModel } from '../models/roulette-session-match.model';
import { RouletteSessionModel } from '../models/roulette-session.model';

@Resolver(() => RouletteSessionMatchModel)
export class RouletteSessionMatchFieldResolver {
  @ResolveField(() => UserModel, { name: 'companion' })
  async resolveCompanion(
    @Parent() parent: RouletteSessionMatchModel,
    @Loader(UserByIdDataloader)
    loader: DataLoader<UserEntity['id'], UserEntity>,
  ): Promise<UserModel> {
    const entity = await loader.load(parent.companionId);

    return UserModel.createFromEntity(entity);
  }

  @ResolveField(() => RouletteSessionModel, { name: 'session' })
  async resolveSession(
    @Parent() parent: RouletteSessionMatchModel,
    @Loader(SessionByIdDataloader)
    loader: DataLoader<RouletteSessionEntity['id'], RouletteSessionEntity>,
  ): Promise<RouletteSessionModel> {
    const entity = await loader.load(parent.sessionId);

    return RouletteSessionModel.createFromEntity(entity);
  }
}

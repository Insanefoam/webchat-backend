import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CreateFriendshipInput,
  UpdateFriendshipStatusInput,
} from '../friendships.inputs';
import { CreateFriendshipPayload } from '../friendships.payloads';
import { IsUserFriendshipOwnerGuard } from '../guards/is-user-friendship-owner.guard';
import { FriendshipModel } from '../models/friendship.model';
import { FriendshipsService } from '../services/friendships.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class FriendshipsMutationResolver {
  constructor(private readonly service: FriendshipsService) {}

  @Mutation(() => CreateFriendshipPayload, { name: 'friendships_createOne' })
  async createOne(
    @Args('input') input: CreateFriendshipInput,
    @IAM() iam: UserEntity,
  ): Promise<CreateFriendshipPayload> {
    return this.service.createOne(iam, input);
  }

  @UseGuards(IsUserFriendshipOwnerGuard)
  @Mutation(() => FriendshipModel, { name: 'friendships_updateOneStatus' })
  async updateOneStatus(
    @Args('input') input: UpdateFriendshipStatusInput,
  ): Promise<FriendshipModel> {
    const entity = await this.service.updateOneStatus(input);

    return FriendshipModel.createFromEntity(entity);
  }
}

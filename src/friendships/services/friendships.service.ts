import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { FriendshipStatus } from '../common/friendships.types';
import { FriendshipEntity } from '../entities/friendship.entity';
import {
  CreateFriendshipInput,
  UpdateFriendshipStatusInput,
} from '../friendships.inputs';
import { CreateFriendshipPayload } from '../friendships.payloads';
import { FriendshipModel } from '../models/friendship.model';

@Injectable()
export class FriendshipsService {
  async createOne(
    currentUser: UserEntity,
    dto: CreateFriendshipInput,
  ): Promise<CreateFriendshipPayload> {
    if (currentUser.id === dto.userId) {
      throw new UnprocessableEntityException(
        `You cant make friendship with yourself`,
      );
    }

    const isFriendshipAlreadyExists = await FriendshipEntity.query()
      .where({
        firstUserId: currentUser.id,
        secondUserId: dto.userId,
      })
      .orWhere({
        firstUserId: dto.userId,
        secondUserId: currentUser.id,
      })
      .resultSize();

    if (isFriendshipAlreadyExists) {
      return { problem: 'Friendship already exists!' };
    }

    const friendship = await FriendshipEntity.query().insertAndFetch({
      firstUserId: currentUser.id,
      secondUserId: dto.userId,
      status: FriendshipStatus.PENDING,
    });

    return { friendship: FriendshipModel.createFromEntity(friendship) };
  }

  async getMany(targetUser: UserEntity): Promise<FriendshipEntity[]> {
    return FriendshipEntity.query()
      .where({ firstUserId: targetUser.id })
      .orWhere({ secondUserId: targetUser.id });
  }

  async updateOneStatus(
    dto: UpdateFriendshipStatusInput,
  ): Promise<FriendshipEntity> {
    return FriendshipEntity.query().updateAndFetchById(dto.friendshipId, {
      status: dto.status,
    });
  }
}

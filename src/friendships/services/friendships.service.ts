import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Problem } from 'src/common/classes/problem.class';
import { UserEntity } from 'src/users/entities/user.entity';
import { FriendshipStatus } from '../common/friendships.types';
import { FriendshipEntity } from '../entities/friendship.entity';
import {
  CreateFriendshipInput,
  UpdateFriendshipStatusInput,
} from '../friendships.inputs';

@Injectable()
export class FriendshipsService {
  async createOne(
    currentUser: UserEntity,
    dto: CreateFriendshipInput,
  ): Promise<FriendshipEntity> {
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
      throw new Problem('Friendship already exists!');
    }

    const friendship = await FriendshipEntity.query().insertAndFetch({
      userId: currentUser.id,
      friendId: dto.userId,
      status: FriendshipStatus.PENDING,
    });

    return friendship;
  }

  async getMany(targetUser: UserEntity): Promise<FriendshipEntity[]> {
    return FriendshipEntity.query()
      .where({ userId: targetUser.id })
      .orWhere({ friendId: targetUser.id });
  }

  async updateOneStatus(
    dto: UpdateFriendshipStatusInput,
  ): Promise<FriendshipEntity> {
    return FriendshipEntity.query().updateAndFetchById(dto.friendshipId, {
      status: dto.status,
    });
  }
}

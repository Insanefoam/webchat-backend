import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class RouletteUsersService {
  private USERS_IDS_CACHE_KEY = 'USERS_IDS_CACHE_KEY';

  constructor(private readonly cache: RedisService) {}

  async makeUserAvailable(userId: UserEntity['id']): Promise<boolean> {
    let availableIds = await this.getAvailableUsersIds();

    if (availableIds) {
      availableIds.push(userId);
    } else {
      availableIds = [userId];
    }

    await this.cache.setObject(this.USERS_IDS_CACHE_KEY, availableIds);

    return true;
  }

  async makeUserUnavailable(userId: UserEntity['id']): Promise<boolean> {
    const availableIds = await this.getAvailableUsersIds();

    const withoutUserId = availableIds.filter((id) => id !== userId);

    await this.cache.setObject(this.USERS_IDS_CACHE_KEY, withoutUserId);

    return true;
  }

  async getAvailableUsersIds(
    excludedId?: UserEntity['id'],
  ): Promise<UserEntity['id'][]> {
    const availableIds = await this.cache.getObject<UserEntity['id'][]>(
      this.USERS_IDS_CACHE_KEY,
    );

    if (excludedId) {
      return availableIds.filter((id) => id !== excludedId);
    }

    return availableIds;
  }

  async getAvailableUsers(
    excludedId?: UserEntity['id'],
  ): Promise<UserEntity[]> {
    const availableIds = await this.getAvailableUsersIds(excludedId);

    let ids = availableIds;
    if (excludedId) {
      ids = availableIds.filter((id) => id !== excludedId);
    }

    return UserEntity.query().findByIds(ids);
  }
}

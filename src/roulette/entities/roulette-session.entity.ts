import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class RouletteSessionEntity extends BaseUUIDEntity {
  static tableName = 'roulette_sessions';

  userId: UserEntity['id'];

  startedAt: string;

  endedAt?: string;
}

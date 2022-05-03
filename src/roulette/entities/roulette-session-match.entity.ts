import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionEntity } from './roulette-session.entity';

export class RouletteSessionMatchEntity extends BaseUUIDEntity {
  static tableName = 'roulette_session_matches';

  sessionId: RouletteSessionEntity['id'];

  userId: RouletteSessionEntity['userId'];

  companionId: UserEntity['id'];

  startedAt: string;

  endedAt?: string;
}

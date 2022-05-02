import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';

export class UserEntity extends BaseUUIDEntity {
  static tableName = 'users';

  username: string;

  password: string;

  nickname: string;

  avatarUrl?: string;
}

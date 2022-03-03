import { BaseEntity } from 'src/common/entities/base.entity';

export class UserEntity extends BaseEntity {
  static tableName = 'users';

  id: string;

  username: string;

  password: string;

  nickname: string;

  avatarUrl?: string;
}

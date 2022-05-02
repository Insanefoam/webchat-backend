import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ReportEntity extends BaseEntity {
  static tableName = 'reports';

  id: string;

  senderId: UserEntity['id'];

  reportedUserId: UserEntity['id'];

  reportContent: string;
}

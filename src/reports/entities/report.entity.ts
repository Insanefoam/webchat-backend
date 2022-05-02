import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ReportEntity extends BaseUUIDEntity {
  static tableName = 'reports';

  senderId: UserEntity['id'];

  reportedUserId: UserEntity['id'];

  reportContent: string;
}

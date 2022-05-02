import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { ReportEntity } from '../entities/report.entity';

@ObjectType('Report')
export class ReportModel {
  constructor(entity: ReportEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field(() => UserModel)
  sender: UserModel;

  @Field()
  senderId: string;

  @Field(() => UserModel)
  reportedUser: UserModel;

  @Field()
  reportedUserId: string;

  @Field()
  reportContent: string;

  static createFromEntity(entity: ReportEntity): ReportModel;
  static createFromEntity(entities: ReportEntity[]): ReportModel[];
  static createFromEntity(
    entityOrEntities: ReportEntity | ReportEntity[],
  ): ReportModel | ReportModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map<ReportModel>(ReportModel.createFromEntity);
    }

    return new ReportModel(entityOrEntities);
  }
}

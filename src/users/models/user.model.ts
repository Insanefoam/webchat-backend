import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@ObjectType('User')
export class UserModel {
  constructor(entity: UserEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  static createFromEntity(entity: UserEntity): UserModel;
  static createFromEntity(entities: UserEntity[]): UserModel[];
  static createFromEntity(
    entityOrEntities: UserEntity | UserEntity[],
  ): UserModel | UserModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        UserModel.createFromEntity(entity),
      );
    }

    return new UserModel(entityOrEntities);
  }
}

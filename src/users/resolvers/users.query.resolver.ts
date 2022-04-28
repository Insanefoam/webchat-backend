import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersQueryResolver {
  constructor(private readonly service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel, { name: 'me_getMe' })
  async getMe(@IAM() iam: UserEntity): Promise<UserModel> {
    return UserModel.createFromEntity(iam);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserModel], { name: 'users_getMany' })
  async getMany(): Promise<UserModel[]> {
    const users = await this.service.getMany();

    return UserModel.createFromEntity(users);
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from '../entities/user.entity';
import { UpdateProfileInput } from '../inputs/users.inputs';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class UsersMutationResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel, { name: 'me_updateProfile' })
  async updateProfile(
    @IAM() iam: UserEntity,
    @Args('input') input: UpdateProfileInput,
  ): Promise<UserModel> {
    const entity = await this.usersService.updateOne(iam.id, input);

    return UserModel.createFromEntity(entity);
  }
}

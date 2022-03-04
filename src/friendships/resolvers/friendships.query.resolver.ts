import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { FriendshipModel } from '../models/friendship.model';
import { FriendshipsService } from '../services/friendships.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class FriendshipsQueryResolver {
  constructor(private readonly service: FriendshipsService) {}

  @Query(() => [FriendshipModel], { name: 'friendships_getMany' })
  async getMany(@IAM() iam: UserEntity): Promise<FriendshipModel[]> {
    const data = await this.service.getMany(iam);

    return FriendshipModel.createFromEntity(data);
  }
}

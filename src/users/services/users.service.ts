import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  async getMany(): Promise<UserEntity[]> {
    const data = await UserEntity.query();

    return data;
  }
}

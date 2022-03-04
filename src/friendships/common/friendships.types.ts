import { registerEnumType } from '@nestjs/graphql';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

registerEnumType(FriendshipStatus, { name: 'FriendshipStatusEnum' });

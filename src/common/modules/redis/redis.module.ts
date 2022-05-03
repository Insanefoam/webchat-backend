import { Module } from '@nestjs/common';
import { RedisClientFactory } from './redis-client.factory';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisClientFactory, RedisService],
  exports: [RedisService],
})
export class RedisModule {}

import { Module } from '@nestjs/common';
import { ScyllaClientFactory } from './scylla-client.factory';
import { ScyllaService } from './scylla.service';

@Module({
  providers: [ScyllaService, ScyllaClientFactory],
})
export class ScyllaModule {}

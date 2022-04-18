import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { BaseScyllaEntity } from './base.scylla-entity';
import { ScyllaClientFactory } from './scylla-client.factory';

@Injectable()
export class ScyllaService implements OnModuleInit {
  constructor(
    @Inject(ScyllaClientFactory.provide) private readonly scyllaClient: Client,
  ) {}

  async onModuleInit() {
    this.scyllaClient.connect();
    this._prepareBaseEntity();
  }

  private _prepareBaseEntity() {
    BaseScyllaEntity.client = this.scyllaClient;
  }
}

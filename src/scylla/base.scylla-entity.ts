import { Injectable } from '@nestjs/common';
import { Client, types, mapping } from 'cassandra-driver';

@Injectable()
export class BaseScyllaEntity {
  static client: Client;
  static mapper: mapping.Mapper;

  set client(client: Client) {
    this.client = client;
  }

  static createMapper(options: mapping.MappingOptions): mapping.Mapper {
    const mapper = new mapping.Mapper(this.client, options);

    return mapper;
  }

  static mapRow<T extends BaseScyllaEntity>(row: types.Row): T;
  static mapRow<T extends BaseScyllaEntity>(rows: types.Row[]): T[];
  static mapRow<T extends BaseScyllaEntity>(
    rowOrRows: types.Row | types.Row[],
  ): T | T[] {
    if (Array.isArray(rowOrRows)) {
      return rowOrRows.map((row) => this.mapRow(row));
    }

    const obj = new this();
    Object.assign(obj, rowOrRows);

    return obj as T;
  }
}

import { ClientOptions } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';
import { readFileSync } from 'fs';

@Injectable()
export class ElasticConfigService implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): ClientOptions | Promise<ClientOptions> {
    return {
      auth: { username: 'elastic', password: '-*DkCirPGi9VoQPEkoEj' },
      node: ['https://localhost:9200'],
      tls: {
        ca: readFileSync('elastic/http_ca.crt'),
        rejectUnauthorized: false,
      },
    };
  }
}

import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticConfigService } from '../services/elastic-config.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({ useClass: ElasticConfigService }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticModule {}

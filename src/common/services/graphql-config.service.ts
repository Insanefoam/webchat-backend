import { Injectable } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { join } from 'path';

@Injectable()
export class GraphqlConfigService implements ApolloDriverConfigFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    };
  }
}

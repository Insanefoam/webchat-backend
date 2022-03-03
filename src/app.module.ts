import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadConfiguration } from './common/configuration/configuration';
import { GraphqlConfigService } from './common/services/graphql-config.service';
import { ObjectionConfigService } from './common/services/objection-config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlConfigService,
    }),
    ConfigModule.forRoot({ load: [loadConfiguration], isGlobal: true }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ObjectionConfigService],
})
export class AppModule {}

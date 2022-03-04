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
import { FriendshipsModule } from './friendships/friendships.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'libs/insanefoam-dataloader/src/dataloader.interceptor';
import { dataloaderProviders } from './common/dataloaders';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlConfigService,
    }),
    ConfigModule.forRoot({ load: [loadConfiguration], isGlobal: true }),
    UsersModule,
    AuthModule,
    FriendshipsModule,
    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ObjectionConfigService,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
    ...dataloaderProviders,
  ],
})
export class AppModule {}

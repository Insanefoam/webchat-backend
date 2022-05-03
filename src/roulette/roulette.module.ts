import { Module } from '@nestjs/common';
import { RouletteService } from './services/roulette.service';
import { RouletteQueryResolver } from './resolvers/roulette.query.resolver';
import { RouletteMutationResolver } from './resolvers/roulette.mutation.resolver';
import { RouletteSessionsService } from './services/roulette-sessions.service';
import { RouletteUsersService } from './services/roulette-users.service';
import { RouletteMatchingsService } from './services/roulette-matchings.service';
import { RouletteSessionMatchFieldResolver } from './resolvers/roulette-session-match.field.resolver';
import { RedisModule } from 'src/common/modules/redis/redis.module';
import { RouletteParticipantsGateway } from './sockets/roulette-participants.gateway';
import { RouletteMatchingsGateway } from './sockets/roulette-matchings.gateway';

@Module({
  imports: [RedisModule],
  providers: [
    RouletteQueryResolver,
    RouletteMutationResolver,
    RouletteService,
    RouletteSessionsService,
    RouletteUsersService,
    RouletteMatchingsService,
    RouletteSessionMatchFieldResolver,
    RouletteParticipantsGateway,
    RouletteMatchingsGateway,
  ],
})
export class RouletteModule {}

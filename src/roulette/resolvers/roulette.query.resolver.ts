import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-fastify';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Problem } from 'src/common/classes/problem.class';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionMatchModel } from '../models/roulette-session-match.model';
import { RouletteSessionModel } from '../models/roulette-session.model';
import { RouletteMatchingsService } from '../services/roulette-matchings.service';
import { RouletteSessionsService } from '../services/roulette-sessions.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class RouletteQueryResolver {
  constructor(
    private readonly sessionsService: RouletteSessionsService,
    private readonly matchingService: RouletteMatchingsService,
  ) {}

  @Query(() => RouletteSessionModel, { name: 'roulette_getActiveSession' })
  async getActiveSession(
    @IAM() iam: UserEntity,
  ): Promise<RouletteSessionModel> {
    try {
      const entity = await this.sessionsService.getUserActiveSessionOrFail(
        iam.id,
      );

      return RouletteSessionModel.createFromEntity(entity);
    } catch (e) {
      if (e instanceof Problem) {
        throw new ApolloError(e.message);
      }
      throw e;
    }
  }

  @Query(() => RouletteSessionMatchModel, {
    name: 'roulette_getActiveMatch',
    nullable: true,
  })
  async getActiveMatch(
    @IAM() iam: UserEntity,
  ): Promise<RouletteSessionMatchModel> {
    try {
      const entity = await this.matchingService.getUserActiveMatch(iam.id);

      return entity && RouletteSessionMatchModel.createFromEntity(entity);
    } catch (e) {
      if (e instanceof Problem) {
        throw new ApolloError(e.message);
      }
      throw e;
    }
  }
}

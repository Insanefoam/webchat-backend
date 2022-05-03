import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-fastify';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Problem } from 'src/common/classes/problem.class';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionMatchModel } from '../models/roulette-session-match.model';
import { RouletteSessionModel } from '../models/roulette-session.model';
import { RouletteService } from '../services/roulette.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class RouletteMutationResolver {
  constructor(private readonly rouletteService: RouletteService) {}

  @Mutation(() => RouletteSessionModel, { name: 'roulette_startSession' })
  async startRoulette(@IAM() iam: UserEntity): Promise<RouletteSessionModel> {
    const entity = await this.rouletteService.startRouletteSession(iam.id);

    return RouletteSessionModel.createFromEntity(entity);
  }

  @Mutation(() => RouletteSessionModel, { name: 'roulette_endSession' })
  async endRoulette(
    @IAM() iam: UserEntity,
    @Args('sessionId', ParseUUIDPipe) sessionId: string,
  ): Promise<RouletteSessionModel> {
    const entity = await this.rouletteService.stopRouletteSession(
      sessionId,
      iam.id,
    );

    return RouletteSessionModel.createFromEntity(entity);
  }

  @Mutation(() => RouletteSessionMatchModel, { name: 'roulette_requestMatch' })
  async requestMatch(
    @IAM() iam: UserEntity,
    @Args('sessionId', ParseUUIDPipe) sessionId: string,
  ): Promise<RouletteSessionMatchModel> {
    try {
      const entity = await this.rouletteService.requestNewMatch(
        iam.id,
        sessionId,
      );

      return RouletteSessionMatchModel.createFromEntity(entity);
    } catch (e) {
      if (e instanceof Problem) {
        throw new ApolloError(e.message);
      }

      throw new ApolloError(`Что-то пошло не так...`);
    }
  }

  @Mutation(() => RouletteSessionMatchModel, { name: 'roulette_stopMatch' })
  async stopMatch(
    @IAM() iam: UserEntity,
    @Args('matchId', ParseUUIDPipe) matchId: string,
  ): Promise<RouletteSessionMatchModel> {
    try {
      const entity = await this.rouletteService.stopMatch(iam.id, matchId);

      return RouletteSessionMatchModel.createFromEntity(entity);
    } catch (e) {
      if (e instanceof Problem) {
        throw new ApolloError(e.message);
      }

      throw new ApolloError(`Что-то пошло не так...`);
    }
  }
}

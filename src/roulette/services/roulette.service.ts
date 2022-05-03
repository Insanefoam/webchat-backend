import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionMatchEntity } from '../entities/roulette-session-match.entity';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';
import { RouletteMatchingsService } from './roulette-matchings.service';
import { RouletteSessionsService } from './roulette-sessions.service';
import { RouletteUsersService } from './roulette-users.service';

@Injectable()
export class RouletteService {
  constructor(
    private readonly rouletteSessionsService: RouletteSessionsService,
    private readonly rouletteUsersService: RouletteUsersService,
    private readonly rouletteMatchingService: RouletteMatchingsService,
  ) {}

  async startRouletteSession(
    userId: UserEntity['id'],
  ): Promise<RouletteSessionEntity> {
    const session = await this.rouletteSessionsService.createOne({ userId });

    await this.rouletteUsersService.makeUserAvailable(userId);

    return session;
  }

  async stopRouletteSession(
    sessionId: RouletteSessionEntity['id'],
    userId: UserEntity['id'],
  ): Promise<RouletteSessionEntity> {
    const endedSession = await this.rouletteSessionsService.stopOne(sessionId);

    await this.rouletteUsersService.makeUserUnavailable(userId);

    return endedSession;
  }

  async requestNewMatch(
    userId: UserEntity['id'],
    sessionId: RouletteSessionEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const match = await this.rouletteMatchingService.createMatch(
      userId,
      sessionId,
    );

    return match;
  }

  async stopMatch(
    userId: UserEntity['id'],
    matchId: RouletteSessionMatchEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const match = await this.rouletteMatchingService.stopMatch(userId, matchId);

    return match;
  }
}

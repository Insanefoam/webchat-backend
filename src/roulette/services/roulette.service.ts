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
    private readonly sessionsService: RouletteSessionsService,
    private readonly usersService: RouletteUsersService,
    private readonly matchingService: RouletteMatchingsService,
  ) {}

  async startRouletteSession(
    userId: UserEntity['id'],
  ): Promise<RouletteSessionEntity> {
    const session = await this.sessionsService.createOne({ userId });

    await this.usersService.makeUserAvailable(userId);

    return session;
  }

  async stopRouletteSession(
    sessionId: RouletteSessionEntity['id'],
    userId: UserEntity['id'],
  ): Promise<RouletteSessionEntity> {
    const endedSession = await this.sessionsService.stopOne(sessionId);

    await this.usersService.makeUserUnavailable(userId);

    return endedSession;
  }

  async requestNewMatch(
    userId: UserEntity['id'],
    sessionId: RouletteSessionEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const match = await this.matchingService.createMatch(userId, sessionId);

    return match;
  }

  async stopMatch(
    userId: UserEntity['id'],
    matchId: RouletteSessionMatchEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const match = await this.matchingService.stopMatch(userId, matchId);

    return match;
  }
}

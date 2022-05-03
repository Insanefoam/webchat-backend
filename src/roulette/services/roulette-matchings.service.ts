import { Injectable } from '@nestjs/common';
import { Problem } from 'src/common/classes/problem.class';
import { getRandomElement } from 'src/common/utils';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionMatchEntity } from '../entities/roulette-session-match.entity';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';
import { RouletteSessionsService } from './roulette-sessions.service';
import { RouletteUsersService } from './roulette-users.service';

@Injectable()
export class RouletteMatchingsService {
  constructor(
    private readonly rouletteUsersService: RouletteUsersService,
    private readonly rouletteSessionsService: RouletteSessionsService,
  ) {}

  async createMatch(
    iamId: UserEntity['id'],
    sessionId: RouletteSessionEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const isSessionActive = await RouletteSessionEntity.query()
      .where({ id: sessionId })
      .whereNull('endedAt')
      .resultSize();

    if (!isSessionActive) {
      throw new Problem(`Сессия не активна`);
    }

    const availableUsers = await this.rouletteUsersService.getAvailableUsers(
      iamId,
    );

    if (availableUsers.length === 0) {
      throw new Problem(`В рулетке нету активных пользователей`);
    }

    const companion = getRandomElement(availableUsers);
    const companionActiveSession =
      await this.rouletteSessionsService.getUserActiveSessionOrFail(
        companion.id,
      );

    const iamMatch = await this._startMatch({
      userId: iamId,
      companionId: companion.id,
      sessionId: sessionId,
    });
    await this._startMatch({
      userId: companion.id,
      companionId: iamId,
      sessionId: companionActiveSession.id,
    });

    await this.rouletteUsersService.makeUserUnavailable(iamId);
    await this.rouletteUsersService.makeUserUnavailable(companion.id);

    return iamMatch;
  }

  async stopMatch(
    iamId: UserEntity['id'],
    matchId: RouletteSessionMatchEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const iamMatch = await RouletteSessionMatchEntity.query().findOne({
      id: matchId,
    });

    if (iamMatch.userId !== iamId || iamMatch.endedAt) {
      throw new Problem(`Беседа не активна`);
    }

    const companionMatch = await this.getUserActiveMatch(iamMatch.companionId);

    const endedMatch = await this._endMatch(iamMatch.id);
    await this._endMatch(companionMatch.id);

    await this.rouletteUsersService.makeUserAvailable(endedMatch.userId);
    await this.rouletteUsersService.makeUserAvailable(endedMatch.companionId);

    return endedMatch;
  }

  async getUserActiveMatch(
    userId: UserEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const match = await RouletteSessionMatchEntity.query()
      .findOne({ userId })
      .whereNull('endedAt');

    return match;
  }

  private async _endMatch(
    matchId: RouletteSessionMatchEntity['id'],
  ): Promise<RouletteSessionMatchEntity> {
    const endedMatch =
      await RouletteSessionMatchEntity.query().updateAndFetchById(matchId, {
        endedAt: new Date().toISOString(),
      });

    return endedMatch;
  }

  private async _startMatch(
    props: Pick<
      RouletteSessionMatchEntity,
      'sessionId' | 'userId' | 'companionId'
    >,
  ): Promise<RouletteSessionMatchEntity> {
    const match = await RouletteSessionMatchEntity.query().insertAndFetch({
      userId: props.userId,
      companionId: props.companionId,
      sessionId: props.sessionId,
      startedAt: new Date().toISOString(),
    });

    return match;
  }
}

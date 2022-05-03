import { Injectable } from '@nestjs/common';
import { Problem } from 'src/common/classes/problem.class';
import { UserEntity } from 'src/users/entities/user.entity';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';

@Injectable()
export class RouletteSessionsService {
  async createOne(
    props: Pick<RouletteSessionEntity, 'userId'>,
  ): Promise<RouletteSessionEntity> {
    try {
      const activeSession = await this.getUserActiveSessionOrFail(props.userId);
      if (activeSession) {
        return activeSession;
      }
    } catch {
      const session = await RouletteSessionEntity.query().insertAndFetch({
        userId: props.userId,
        startedAt: new Date().toISOString(),
      });

      return session;
    }
  }

  async getUserActiveSessionOrFail(
    userId: UserEntity['id'],
  ): Promise<RouletteSessionEntity | null> {
    const activeSession = await RouletteSessionEntity.query()
      .findOne({ userId })
      .whereNull('endedAt');

    if (!activeSession) {
      //TODO: Add something like service layer error?
      throw new Problem(`Активная сессия для юзера ${userId} не найдена`);
    }

    return activeSession;
  }

  async stopOne(
    sessionId: RouletteSessionEntity['id'],
  ): Promise<RouletteSessionEntity> {
    const session = await RouletteSessionEntity.query().updateAndFetchById(
      sessionId,
      { endedAt: new Date().toISOString() },
    );

    return session;
  }
}

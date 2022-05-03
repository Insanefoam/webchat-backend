import { UserEntity } from 'src/users/entities/user.entity';

export const websocketRooms = {
  roulettePrivateRoom: (participantId: UserEntity['id']): string =>
    `roulette_private_${participantId}`,
};

export const websocketNamespace = 'roulette';

export const websocketEvents = {
  newMatch: 'new_match',
  matchStopped: 'match_stopped',
};

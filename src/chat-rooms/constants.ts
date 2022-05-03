import { UserEntity } from 'src/users/entities/user.entity';

export const websocketNamespace = 'chat_rooms';

export const websocketRooms = {
  messagesRoom: (userId: UserEntity['id']): string =>
    `chat_messages_private_room_${userId}`,
};

export const websocketEvents = {
  newMessage: 'new_message',
};

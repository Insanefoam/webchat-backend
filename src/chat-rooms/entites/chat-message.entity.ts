import { mapping } from 'cassandra-driver';
import { randomUUID } from 'crypto';
import { BaseScyllaEntity } from 'src/scylla/base.scylla-entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomEntity } from './chat-room.entity';

/**
 * Partition key: chatId, date
 * Clustering key: createdAt
 */
export class ChatMessageEntity extends BaseScyllaEntity {
  id: string;

  content: string;

  date: string;

  chatRoomId: ChatRoomEntity['id'];

  senderId: UserEntity['id'];

  createdAt: string;

  static get mapper() {
    return this.createMapper({
      models: {
        Message: {
          tables: ['messages'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    });
  }
  static get messageMapper() {
    return this.mapper.forModel<ChatMessageEntity>('Message');
  }

  static async findAll(): Promise<ChatMessageEntity[]> {
    const result = await this.messageMapper.findAll();

    return result.toArray();
  }

  static async findByChatAndDate(
    chatRoomId: ChatMessageEntity['chatRoomId'],
    date: ChatMessageEntity['date'],
  ): Promise<ChatMessageEntity[]> {
    const result = await this.messageMapper.find({ chatRoomId, date });

    return result.toArray();
  }

  static async createOne(
    partial: Partial<ChatMessageEntity>,
  ): Promise<ChatMessageEntity> {
    await this.messageMapper.insert({ ...partial, id: randomUUID() });

    const result = await this.messageMapper.find({
      chatRoomId: partial.chatRoomId,
      date: partial.date,
    });

    return result.first();
  }
}

import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ChatMessageEntity } from '../entites/chat-message.entity';

@Injectable()
export class IndexChatMessagesService {
  constructor(private readonly elastic: ElasticsearchService) {}

  async indexMessage(message: ChatMessageEntity) {
    try {
      await this.elastic.index({
        index: 'chat_messages',
        document: message,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}

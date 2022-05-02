import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ELASTIC_INDEXES } from 'src/common/constants';
import { ChatMessageEntity } from '../entites/chat-message.entity';

@Injectable()
export class SearchChatMessagesService {
  constructor(private readonly elastic: ElasticsearchService) {}

  async getHits(
    partial: Partial<ChatMessageEntity>,
  ): Promise<ChatMessageEntity[]> {
    const hits = await this.elastic.search({
      index: ELASTIC_INDEXES.CHAT_MESSAGES,
      query: {
        match: {
          content: partial.content,
        },
      },
    });

    const messages = hits.hits.hits.map(
      (hit) => hit._source as ChatMessageEntity,
    );

    return messages;
  }
}

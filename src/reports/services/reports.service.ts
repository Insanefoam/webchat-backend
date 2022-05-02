import { Injectable } from '@nestjs/common';
import { ReportEntity } from '../entities/report.entity';

@Injectable()
export class ReportsService {
  async createOne(
    props: Pick<ReportEntity, 'senderId' | 'reportedUserId' | 'reportContent'>,
  ): Promise<ReportEntity> {
    const report = await ReportEntity.query().insertAndFetch({ ...props });

    return report;
  }
}

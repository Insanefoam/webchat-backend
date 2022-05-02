import { Module } from '@nestjs/common';
import { ReportsService } from './services/reports.service';
import { ReportsQueryResolver } from './resolvers/reports.query.resolver';
import { ReportsMutationResolver } from './resolvers/reports.mutation.resolver';
import { ReportsFieldResolver } from './resolvers/reports.field.resolver';

@Module({
  providers: [
    ReportsQueryResolver,
    ReportsMutationResolver,
    ReportsFieldResolver,
    ReportsService,
  ],
})
export class ReportsModule {}

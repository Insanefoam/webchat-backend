import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { SendReportInput } from '../inputs/reports.inputs';
import { ReportModel } from '../models/report.model';
import { ReportsService } from '../services/reports.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ReportsMutationResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Mutation(() => ReportModel, { name: 'reports_sendReport' })
  async sendReport(
    @IAM() iam: UserEntity,
    @Args('input') input: SendReportInput,
  ): Promise<ReportModel> {
    const entity = await this.reportsService.createOne({
      senderId: iam.id,
      reportedUserId: input.userId,
      reportContent: input.content,
    });

    return ReportModel.createFromEntity(entity);
  }
}

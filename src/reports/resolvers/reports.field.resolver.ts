import { Resolver } from '@nestjs/graphql';
import { ReportModel } from '../models/report.model';

@Resolver(() => ReportModel)
export class ReportsFieldResolver {}

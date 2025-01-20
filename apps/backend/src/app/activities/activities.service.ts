import { Inject, Injectable } from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import moment from 'moment';
import { DatabaseService } from '../core/services/database/database.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  public constructor(
    @Inject(DatabaseService) private dbService: DatabaseService,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    return this.dbService.activity.create({
      data: {
        agentId: createActivityDto.agentId,
        date: moment.utc(createActivityDto.date).toISOString(),
        type: createActivityDto.type,
      },
    });
  }

  findAll(date: Date) {
    const beginDate = moment.utc(date).startOf('month').toDate();
    const endDate = moment.utc(date).endOf('month').toDate();

    return this.dbService.activity.findMany({
      where: {
        date: {
          gt: beginDate,
          lt: endDate,
        },
      },
      include: {
        agent: true,
      },
    });
  }

  find(agentId: string, date: Date) {
    const beginDate = moment.utc(date).startOf('month').toDate();
    const endDate = moment.utc(date).endOf('month').toDate();

    return this.dbService.activity.findMany({
      where: {
        agentId,
        date: {
          gt: beginDate,
          lt: endDate,
        },
      },
    });
  }

  update(id: string, type: ActivityType) {
    return this.dbService.activity.update({
      where: { id },
      data: {
        type: type,
      },
    });
  }

  remove(id: string) {
    return this.dbService.activity.delete({
      where: { id },
    });
  }
}

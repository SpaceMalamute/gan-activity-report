import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get(':date')
  findAll(@Param('date') date: Date) {
    return this.activitiesService.findAll(date);
  }

  @Get(':agentId/:date')
  find(@Param('agentId') agentId: string, @Param('date') date: Date) {
    return this.activitiesService.find(agentId, date);
  }

  @Patch(':id/:type')
  update(@Param('id') id: string, @Param('type') type: ActivityType) {
    return this.activitiesService.update(id, type);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}

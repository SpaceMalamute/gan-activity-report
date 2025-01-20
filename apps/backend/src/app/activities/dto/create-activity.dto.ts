import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '@prisma/client';

export class CreateActivityDto {
  @ApiProperty()
  agentId: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  type: ActivityType;
}

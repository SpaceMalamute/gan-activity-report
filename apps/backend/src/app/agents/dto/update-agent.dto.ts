import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentDto } from './create-agent.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgentDto extends PartialType(CreateAgentDto) {
  @ApiProperty()
  id: string;
}

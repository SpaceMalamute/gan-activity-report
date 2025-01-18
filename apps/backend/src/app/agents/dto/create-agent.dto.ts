import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}

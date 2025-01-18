import { Inject, Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { DatabaseService } from '../core/services/database/database.service';

@Injectable()
export class AgentsService {
  public constructor(
    @Inject(DatabaseService) private dbService: DatabaseService,
  ) {}

  public create(createAgentDto: CreateAgentDto) {
    return this.dbService.agent.create({
      data: {
        name: createAgentDto.name,
        email: createAgentDto.email,
      },
    });
  }

  public findAll() {
    return this.dbService.agent.findMany();
  }

  public findOne(id: string) {
    return this.dbService.agent.findUnique({
      where: { id },
    });
  }

  public update(id: string, updateAgentDto: UpdateAgentDto) {
    return this.dbService.agent.update({
      where: { id },
      data: {
        name: updateAgentDto.name,
        email: updateAgentDto.email,
      },
    });
  }

  public remove(id: string) {
    return this.dbService.agent.delete({
      where: { id },
    });
  }
}

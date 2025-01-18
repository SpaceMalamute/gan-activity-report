import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [CoreModule, AgentsModule],
})
export class AppModule {}

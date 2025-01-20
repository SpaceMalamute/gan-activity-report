import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { AgentsModule } from './agents/agents.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, AgentsModule, ActivitiesModule],
})
export class AppModule {}

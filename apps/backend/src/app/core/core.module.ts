import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './services/database/database.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class CoreModule {}

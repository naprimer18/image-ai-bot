import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsResolvers } from './logs.resolvers';
import { Logs } from 'src/typeorm/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  controllers: [],
  providers: [LogsService, LogsResolvers],
  exports: [LogsService],
})
export class LogsModule {}

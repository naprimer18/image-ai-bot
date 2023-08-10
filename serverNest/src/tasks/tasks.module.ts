import { Module } from '@nestjs/common';
// import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolvers } from './task.resolvers';
import { Task } from 'src/typeorm/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [TasksService, TaskResolvers],
  exports: [TasksService],
})
export class TasksModule {}

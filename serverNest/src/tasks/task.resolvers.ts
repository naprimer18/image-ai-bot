import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Task } from 'src/typeorm/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TaskResolvers {
  constructor(private readonly taskService: TasksService) {}

  @Query(() => [Task])
  async getAllTasks() {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  async addTask(@Args('name') name: string) {
    return this.taskService.addTask(name, 'test1');
  }

  @Mutation(() => Task)
  async editTask(@Args('id') id: string, @Args('name') name: string) {
    return this.taskService.editTask(id, name);
  }

  @Mutation(() => Task)
  async removeTask(@Args('id') id: string) {
    console.log('id ', id);
    return this.taskService.removeTask(id);
  }
}

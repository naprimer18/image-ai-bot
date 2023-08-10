import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Logs } from 'src/typeorm/logs.entity';
import { LogsService } from './logs.service';

@Resolver(() => Logs)
export class LogsResolvers {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [Logs])
  async getAllLogss() {
    return this.logsService.getLogs();
  }

  @Mutation(() => Logs)
  async addLogs(@Args('name') name: string) {
    return this.logsService.addLogs(name, 'test1');
  }
}

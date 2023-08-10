import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { TelegramService } from './telegram.service';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), TasksModule],
  providers: [TelegramService],
})
export class TelegramModule {}

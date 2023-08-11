import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './tg-chat-bot-config.factory';
import { TgChatBotService } from './tg-chat-bot.service';
import { LogsModule } from 'src/logger/logs.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), LogsModule],
  providers: [TgChatBotService],
})
export class TgChatBotModule {}

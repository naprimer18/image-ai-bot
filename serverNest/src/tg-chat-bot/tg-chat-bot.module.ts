import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './tg-chat-bot-config.factory';
import { TgChatBotService } from './tg-chat-bot.service';
import { LogsModule } from 'src/logger/logs.module';
import { ChatgptModule } from 'src/chatgpt/chatgpt.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), LogsModule, ChatgptModule],
  providers: [TgChatBotService],
})
export class TgChatBotModule {}

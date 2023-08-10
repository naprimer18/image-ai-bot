import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './tg-image-generator-bot-config.factory';
import { TgImageGeneratorService } from './tg-image-generator-bot.service';
import { LogsModule } from 'src/logger/logs.module';

@Module({
  imports: [TelegrafModule.forRootAsync(options()), LogsModule],
  providers: [TgImageGeneratorService],
})
export class TgImageGeneratorModule {}

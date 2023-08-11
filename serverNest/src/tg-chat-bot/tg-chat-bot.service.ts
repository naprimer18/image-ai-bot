import { ConfigService } from '@nestjs/config';
import { Start, Update, Ctx, On, Message } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { Configuration, OpenAIApi } from 'openai';
import { LogsService } from 'src/logger/logs.service';

type Context = Scenes.SceneContext;

@Update()
export class TgChatBotService extends Telegraf<Context> {
  private openai;

  constructor(
    private readonly configService: ConfigService,
    private readonly logsService: LogsService,
  ) {
    super(configService.get('TELEGRAM_CHAT_API'));
    const configuration = new Configuration({
      apiKey: configService.get('GPT_API'),
    });
    this.openai = new OpenAIApi(configuration);
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Привет, ${ctx.from.username}</b>
        Спроси меня и я тебе отвечу!
    `);
  }

  @On('text')
  async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    console.log('message ', message);
    try {
      this.logsService.addLogs(
        ctx.from.username || 'user',
        message || 'messge',
      );
    } catch (e) {
      console.log('err ', e);
    }
  }
}

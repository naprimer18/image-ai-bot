import { ConfigService } from '@nestjs/config';
import { Start, Update, Ctx, On, Message } from 'nestjs-telegraf';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { LogsService } from 'src/logger/logs.service';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TgChatBotService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
    private readonly gpt: ChatgptService,
    private readonly logsService: LogsService,
  ) {
    super(configService.get('TELEGRAM_CHAT_API'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Привет, ${ctx.from.username}</b>
      Введите любой вопрос и получите ответ!
    `);
  }

  @On('text')
  async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    try {
      ctx.replyWithHTML(
        `Уважаемый(ая) ${
          ctx.from?.username || 'пользователь'
        }, ваш ответ будет скоро готов!`,
      );
      const res = await this.gpt.generateResponse(message);
      this.logsService.addLogs(
        ctx.from.username || 'user',
        message || 'messge',
      );
      ctx.replyWithHTML(res.data.choices[0].text);
    } catch (e) {
      console.log('err', e);
      ctx.replyWithHTML(
        'К сожалению, я не могу ответить на подобный вопрос, попробуйте перефарзировать или добавить больше описания',
      );
    }
  }
}

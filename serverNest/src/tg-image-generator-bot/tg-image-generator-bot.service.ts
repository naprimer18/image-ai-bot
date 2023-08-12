import { ConfigService } from '@nestjs/config';
import { Start, Update, Ctx, On, Message } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { Configuration, OpenAIApi } from 'openai';
import { LogsService } from 'src/logger/logs.service';

type Context = Scenes.SceneContext;

@Update()
export class TgImageGeneratorService extends Telegraf<Context> {
  private openai;

  constructor(
    private readonly configService: ConfigService,
    private readonly logsService: LogsService,
  ) {
    super(configService.get('TELEGRAM_IMAGE_API'));

    const configuration = new Configuration({
      apiKey: configService.get('GPT_API'),
    });
    this.openai = new OpenAIApi(configuration);
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Привет, ${ctx.from.username}</b>
        Введите любую фразу и получите ее визуализацию!
    `);
  }

  @On('text')
  async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    try {
      console.log('message ', message);
      const prompt = `${message}`;
      const size = '256x256';
      const number = 1;
      ctx.replyWithHTML(
        `Уважаемый(ая) ${
          ctx.from.username || 'пользователь'
        }, визуализация "${message}", скоро будет готова!`,
      );
      this.logsService.addLogs(
        ctx.from.username || 'user',
        message || 'messge',
      );

      const response = await this.openai.createImage({
        prompt,
        size,
        n: Number(number),
      });

      ctx.replyWithPhoto(response.data.data[0].url);
    } catch (e) {
      console.log('err ', e);
      ctx.replyWithHTML(
        'К сожалению, я не могу делать подобную визуализацию, попробуйте перефарзировать или добавить больше описания',
      );
    }
  }
}

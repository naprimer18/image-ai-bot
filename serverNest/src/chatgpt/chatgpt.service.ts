import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Observable, catchError, map, of } from 'rxjs';

interface GptAnswer {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

@Injectable()
export class ChatgptService {
  private readonly logger = new Logger(ChatgptService.name);
  private gptUrl;
  private openai;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.gptUrl = 'https://api.openai.com/v1/chat/completions';
    const configuration = new Configuration({
      apiKey: this.configService.get('GPT_API'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async generateResponse(content: string): Promise<any> {
    const res = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${content}`, //here you can add some prompts as well if you want to configure the bot littlebit
      temperature: 0.7, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    return res;

    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.apiKey}`,
    // };
    // const data = {
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content }],
    //   temperature: 1,
    // };
    // return this.httpService
    //   .post<GptAnswer>(this.gptUrl, data, { headers })
    //   .pipe(
    //     map(({ data }) => data.choices[0].message.content.trim()),
    //     catchError((err) => {
    //       this.logger.error(err);
    //       return of('Произошла ошибка');
    //     }),
    //   );
  }
}

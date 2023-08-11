import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { LogsModule } from './logger/logs.module';
import entities from './typeorm';
import { join } from 'path';
import { TgImageGeneratorModule } from './tg-image-generator-bot/tg-image-generator-bot.module';
import { TgChatBotModule } from './tg-chat-bot/tg-chat-bot.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // db
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    // graphql
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql') // code first
      typePaths: ['./**/*.graphql'], // schema first
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        // outputAs: 'class',
        skipResolverArgs: true,
      },
    }),
    // services
    // LogsModule,
    TgImageGeneratorModule,
    TgChatBotModule,
    ChatgptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

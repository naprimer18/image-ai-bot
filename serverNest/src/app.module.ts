import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TasksModule } from './tasks/tasks.module';
import entities from './typeorm';
import { join } from 'path';
import { TelegramModule } from './telegram/telegram.module';

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
    TasksModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

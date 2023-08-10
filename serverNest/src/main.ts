import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for swager
  const config = new DocumentBuilder()
    .setTitle('Nestjs with Postgres')
    .setVersion('1.0')
    .addTag('nest-postgres')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(8080);
  console.log(`Server listening on ${8080}`);
}
bootstrap();

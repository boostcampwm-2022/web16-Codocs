import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Codocs API Docs')
    .setDescription('Codocs API 문서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const adapterHost = app.get(HttpAdapterHost);
  //  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://codocs.site',
      'https://codocs.site',
      'http://www.codocs.site',
      'https://www.codocs.site'
    ],
    credentials: true
  });

  await app.listen(8000);
}
bootstrap();

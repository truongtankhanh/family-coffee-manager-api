import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('API for cafe management')
      .setVersion('1.0')
      .setBasePath(globalPrefix)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Docs API is running on: http://localhost:${port}/${globalPrefix}/docs`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

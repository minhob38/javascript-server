import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ServerExceptionFiler } from './exceptions/server-exception.filter';
import { MyLogger } from './logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* [mvc]
  - https://docs.nestjs.com/techniques/mvc#model-view-controller
  */
  app.useStaticAssets(path.join(__dirname, 'public'));
  app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.setViewEngine('hbs');

  /* [validation]
  - https://docs.nestjs.com/techniques/validation#validation
  */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /* [exception filter]
  - 아래 → 위 순서로 filtering합니다. (ServerExceptionFiler만 있어도 되지만, filter 동작원리를 위해 분리하였습니다.)
  */
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ServerExceptionFiler(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  /* [logger]
  - https://docs.nestjs.com/techniques/logger#logger
  해당 custom logger를 app.useLogger에 넣으면, @nestjs/common의 Logger가 custom logger로 바뀝니다.
  */
  app.useLogger(app.get(MyLogger));

  await app.listen(3000);
}
bootstrap();

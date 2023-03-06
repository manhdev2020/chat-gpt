import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SwaggerSetting } from './config/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSerice = app.get(ConfigService);
  const port = +configSerice.get<number>('PORT') || 8000;

  app.setGlobalPrefix('api');

  app.enableCors();

  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  SwaggerSetting(app);
  await app.listen(port, () => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(
        `=========== 🕵  Server running on http://localhost:${port} ===========‍`,
      );
    }
  });
}

bootstrap();

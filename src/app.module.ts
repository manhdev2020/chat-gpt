import { Module, NestModule } from '@nestjs/common';
import {
  // APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  MiddlewareBuilder,
} from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { HttpExceptionFilter } from './common/filters/http-exception.fiter';
import { TimeoutInterceptor } from './common/interceptors/timout.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { VersionMiddleware } from './common/middlewares/version.middleware';
import { BullOptions } from './config/bull';
import { ConfigGlobal } from './config/configGlobal';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ChatGPTModule } from './modules/v1/chatGPT/chatGPT.module';
import { DatabaseMongoConfig } from './config/mongo';

const commonModule = [];

const moduleV1 = [ChatGPTModule];

@Module({
  imports: [
    DatabaseMongoConfig,
    ConfigModule.forRoot(ConfigGlobal),
    BullModule.forRootAsync(BullOptions),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10000 }),
    ...commonModule,
    ...moduleV1,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareBuilder): void {
    consumer.apply(VersionMiddleware).forRoutes('*');
  }
}

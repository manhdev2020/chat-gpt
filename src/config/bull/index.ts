import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export const BullOptions = {
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),
  ],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('redis.host'),
      port: configService.get<number>('redis.port'),
    },
  }),
  inject: [ConfigService],
};

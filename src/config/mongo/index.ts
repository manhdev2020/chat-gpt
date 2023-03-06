import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseMongoConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      uri: `mongodb://${configService.get<string>(
        'database.host',
      )}:${configService.get<string>(
        'database.port',
      )}/${configService.get<string>('database.name')}`,
      useNewUrlParser: true,
    };
  },
  inject: [ConfigService],
});

import appConfig from '../environments/app.config';
import chatGPTConfig from '../environments/chatGPT.config';
import databaseConfig from '../environments/database.config';
import jwtConfig from '../environments/jwt.config';
import redisConfig from '../environments/redis.config';

export const ConfigGlobal = {
  isGlobal: true,
  load: [databaseConfig, jwtConfig, redisConfig, appConfig, chatGPTConfig],
  validationOptions: {},
  envFilePath: '.env',
};

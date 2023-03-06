import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const callingMaps: Map<string, Promise<unknown>> = new Map();

@Injectable()
export class RedisService {
  private readonly logger: Logger = new Logger(RedisService.name);
  private readonly redis: Redis;
  private readonly projectName: string;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis(
      Number(process.env.REDIS_PORT),
      process.env.REDIS_HOST,
    );

    this.projectName = this.configService.get<string>('app.project_name');
  }

  async keys(pattern: string) {
    try {
      return await this.redis.keys(pattern);
    } catch (e) {
      this.logger.error(`ERROR GET KEYS ${pattern}: ${e.message}`);
    }

    return null;
  }

  async getOrSet<T>(
    key: string,
    getData: () => Promise<T>,
    ttl: number,
  ): Promise<T> {
    let value: T = (await this.get(key)) as T;

    if (value == null) {
      if (callingMaps.has(key)) {
        return callingMaps.get(key) as Promise<T>;
      }

      try {
        const promise = getData();
        // Store key + promise in callingMaps
        callingMaps.set(key, promise);
        value = await promise;
      } finally {
        // Remove key from callingMaps when done
        callingMaps.delete(key);
      }

      if (ttl > 0) {
        await this.setWithTTL(key, value, ttl + Math.floor(Math.random() * 11));
      } else {
        await this.set(key, value);
      }
    }

    return value;
  }

  async setWithTTL(key: string, value: any, expiry = 3600) {
    try {
      return await this.redis.set(
        `${this.projectName}_${key}`,
        JSON.stringify(value),
        'EX',
        expiry,
      );
    } catch (e) {
      this.logger.error(`ERROR SET KEY ${key}: ${e.message}`);
    }
  }

  async set(key: string, value: any) {
    try {
      return await this.redis.set(
        `${this.projectName}_${key}`,
        JSON.stringify(value),
      );
    } catch (e) {
      this.logger.error(`ERROR SET KEY ${key}: ${e.message}`);
    }
  }

  async get(key: string) {
    try {
      const value = await this.redis.get(`${this.projectName}_${key}`);
      return JSON.parse(value);
    } catch (e) {
      this.logger.error(`ERROR GET KEY ${key}: ${e.message}`);
    }
    return null;
  }

  async del(key: string, isPattern = false) {
    try {
      if (isPattern) {
        const keys = await this.keys(`${this.projectName}_${key}`);
        if (!keys.length) return 0;
        return await this.redis.del(keys);
      }

      return await this.redis.del(key);
    } catch (e) {
      this.logger.error(`ERROR DEL KEY ${key}: ${e.message}`);
    }
  }

  async publish(chanel: string, data: any) {
    return await this.redis.publish(chanel, JSON.stringify(data));
  }
}

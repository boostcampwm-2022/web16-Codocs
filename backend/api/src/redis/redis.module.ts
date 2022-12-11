import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        host: process.env.DB_HOST,
        port: 6379
      }
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async ({ host, port }: { host: string, port: number }) => {
        const redis = await new Redis({ host, port });
        return redis;
      }
    }
  ],
  exports: ['REDIS_CLIENT']
})
export class RedisModule {}

import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        port: '6379'
      }
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { port: string }) => {
        const redis = await new Redis(options.port);
        return redis;
      }
    }
  ],
  exports: ['REDIS_CLIENT']
})
export class RedisModule {}

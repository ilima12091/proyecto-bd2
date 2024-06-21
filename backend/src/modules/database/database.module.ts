import { Pool } from 'pg';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_CONNECTION',
      /*useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get<string>('DATABASE_USER'),
          host: configService.get<string>('DATABASE_HOST'),
          database: configService.get<string>('DATABASE_NAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          port: configService.get<number>('DATABASE_PORT'),
        });
        return pool;
      },*/
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          user: 'postgres',
          host: '127.0.0.1',
          database: 'pencaucu',
          password: 'admin',
          port: 5432,
        });
        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}

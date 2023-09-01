import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { TestDataSource } from './test-db.config';
import { ApiModule } from '../../api/api.module';
import { getEnvPath } from '../../common/helper/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}/../../common/envs`);

export const createTestModule = async () =>
  Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ envFilePath, isGlobal: true }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (): DataSourceOptions => TestDataSource,
        inject: [ConfigService],
      }),
      ApiModule,
    ],
  }).compile();

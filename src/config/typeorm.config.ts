import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as config from 'config';

const dbConfig = config.get('db');

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.TYPEORM_HOST,
//   port: parseInt(process.env.TYPEORM_PORT),
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: process.env.TYPEORM_DATABASE,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: dbConfig.type,
      host: process.env.RDS_HOSTNAME || dbConfig.host,
      port: parseInt(process.env.RDS_PORT) || parseInt(dbConfig.port),
      username: process.env.RDS_USERNAME || dbConfig.username,
      password: process.env.RDS_PASSWORD || dbConfig.password,
      database: process.env.RDS_DB_NAME || dbConfig.database,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    };
  }
}

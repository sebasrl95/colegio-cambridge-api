import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  autoLoadEntities: true,
});

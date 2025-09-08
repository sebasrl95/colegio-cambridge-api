import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { AreaModule } from './area/area.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { OficinaModule } from './oficina/oficina.module';
import { SalonModule } from './salon/salon.module';
import { ProfesorModule } from './profesor/profesor.module';
import { AdministrativoModule } from './administrativo/administrativo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfig,
    }),
    AreaModule,
    EmpleadoModule,
    OficinaModule,
    SalonModule,
    ProfesorModule,
    AdministrativoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

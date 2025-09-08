import { Module } from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { AdministrativoController } from './administrativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrativo } from 'src/entities/administrativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrativo])],
  controllers: [AdministrativoController],
  providers: [AdministrativoService],
})
export class AdministrativoModule {}

import { Module } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { OficinaController } from './oficina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficina } from 'src/entities/oficina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oficina])],
  controllers: [OficinaController],
  providers: [OficinaService],
})
export class OficinaModule {}

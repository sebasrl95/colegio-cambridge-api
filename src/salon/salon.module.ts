import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from 'src/entities/salon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [SalonController],
  providers: [SalonService],
})
export class SalonModule {}

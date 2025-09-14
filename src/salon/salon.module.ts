import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Salon, SalonSchema } from 'src/entities/salon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Salon.name, schema: SalonSchema }]),
  ],
  controllers: [SalonController],
  providers: [SalonService],
})
export class SalonModule {}

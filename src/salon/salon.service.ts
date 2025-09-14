import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';
import { Salon } from 'src/entities/salon.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private readonly salonModel: Model<Salon>,
  ) {}

  async create(createSalonDto: CreateSalonDto): Promise<Salon> {
    const existing = await this.salonModel.findOne({
      codigo: createSalonDto.codigo,
    });
    if (existing) {
      throw new ConflictException(
        `El salón con código ${createSalonDto.codigo} ya existe`,
      );
    }

    const nuevoSalon = new this.salonModel(createSalonDto);
    return nuevoSalon.save();
  }

  async findAll(): Promise<Salon[]> {
    return this.salonModel.find().populate('areaId').exec();
  }

  async findOne(id: string): Promise<Salon> {
    const salon = await this.salonModel.findById(id).populate('areaId').exec();
    if (!salon) {
      throw new NotFoundException(`Salón con id ${id} no encontrado`);
    }
    return salon;
  }

  async update(id: string, updateSalonDto: UpdateSalonDto): Promise<Salon> {
    const salon = await this.salonModel
      .findByIdAndUpdate(id, updateSalonDto, { new: true })
      .exec();
    if (!salon) {
      throw new NotFoundException(`Salón con id ${id} no encontrado`);
    }
    return salon;
  }

  async remove(id: string): Promise<Salon> {
    const salon = await this.salonModel.findByIdAndDelete(id).exec();
    if (!salon) {
      throw new NotFoundException(`Salón con id ${id} no encontrado`);
    }
    return salon;
  }
}

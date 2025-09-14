import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from 'src/entities/area.schema';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const findArea = await this.findByName(createAreaDto.nombre);
    if (findArea) {
      throw new HttpException(
        'Esta área ya se encuentra registrada',
        HttpStatus.CONFLICT,
      );
    }

    const newArea = new this.areaModel(createAreaDto);
    return newArea.save();
  }

  async findAll(): Promise<Area[]> {
    return this.areaModel.find().populate('oficinas').exec();
  }

  async findOne(id: string): Promise<Area> {
    const r = await this.areaModel.findById(id).populate('oficinas').exec();
    if (!r) throw new NotFoundException('Área no encontrada');
    return r;
  }

  async findByName(nombre: string): Promise<Area | null> {
    return this.areaModel.findOne({ nombre }).exec();
  }

  async update(id: string, data: Partial<Area>): Promise<Area> {
    const r = await this.areaModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!r) throw new NotFoundException('Área no encontrada');
    return r;
  }

  async remove(id: string): Promise<Area> {
    const r = await this.areaModel.findByIdAndDelete(id).exec();
    if (!r) throw new NotFoundException('Área no encontrada');
    return r;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('salon')
@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Salón creado exitosamente.' })
  create(@Body() createSalonDto: CreateSalonDto) {
    return this.salonService.create(createSalonDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos los salones.' })
  findAll() {
    return this.salonService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve un salón por su ID.' })
  findOne(@Param('id') id: string) {
    return this.salonService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Actualiza un salón.' })
  update(@Param('id') id: string, @Body() updateSalonDto: UpdateSalonDto) {
    return this.salonService.update(+id, updateSalonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un salón.' })
  remove(@Param('id') id: string) {
    return this.salonService.remove(+id);
  }
}

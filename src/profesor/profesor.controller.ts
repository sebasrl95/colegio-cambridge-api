import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Profesor')
@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Profesor creado exitosamente.' })
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos los profesores.' })
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve un profesor por su ID.' })
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Actualiza un profesor.' })
  update(
    @Param('id') id: string,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un profesor.' })
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}

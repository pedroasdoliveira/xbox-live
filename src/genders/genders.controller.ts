import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';

@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiOperation({
    summary: 'criar gênero de jogo'
  })
  create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista gêneros de jogos'
  })
  findAll(): Promise<Gender[]> {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar gêneros'
  })
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar gênero de jogo por Id'
  })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto): Promise<Gender> {
    return this.gendersService.update(id, updateGenderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover gênero de jogo'
  })
  delete(@Param('id') id: string) {
    this.gendersService.delete(id);
  }
}

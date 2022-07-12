import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/User/entities/user.entities';

@ApiTags('genders')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiOperation({
    summary: 'criar gênero de jogo'
  })
  create(@LoggedUser() user: User, @Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(createGenderDto, user);
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
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto): Promise<Gender> {
    return this.gendersService.update(id, updateGenderDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover gênero de jogo'
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.gendersService.delete(id, user);
  }
}

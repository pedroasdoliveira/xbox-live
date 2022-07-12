import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/game.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/User/entities/user.entities';

@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Mostrar catalogo de jogos'
  })
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Procurar por Jogo'
  })
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar Jogo'
  })
  create(@LoggedUser() user: User, @Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar/modificar um Jogo por Id'
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<Game> {
    return this.gamesService.update(id, updateGameDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um Jogo'
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.gamesService.delete(id, user);
  }
}

import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoritesDto } from './dto/create-favorite.dto';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Listar jogos e jogos favoritos do perfil'
  })
  findAll(@Param('id') id: string ) {
    return this.favoritesService.findAll(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Adicionar ou remover jogo da lista de favoritos do perfil'
  })
  addFavorites(@Param('id') id: string, @Body() dto: UpdateFavoritesDto) {
    return this.favoritesService.addFavoriteOrRemove(id, dto.favoriteGameId)
  }
}

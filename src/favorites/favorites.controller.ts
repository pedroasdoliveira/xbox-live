import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
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
    return this.favoritesService.addFavorites(id, dto.favoriteGameId)
  }
}

import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':id')
  findAll(@Param('id') id: string ) {
    return this.favoritesService.findAll(id)
  }

  @Patch(':id')
  addFavorites(@Param('id') id: string, @Body() dto: UpdateFavoritesDto) {
    return this.favoritesService.addFavorites(id, dto)
  }
}

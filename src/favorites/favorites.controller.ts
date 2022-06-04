import { Controller, Get, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':id')
  findAll(@Param('id') id: string ) {
    return this.favoritesService.findAll(id)
  }
}

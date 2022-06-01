import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';

@ApiTags('homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Pagina principal com lista de jogos favoritos listador por gêneros.'
  })
  findOne(@Param('id') id:string) {
    return this.homepageService.findOne(id);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { HomepageService } from './homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get(':id')
  findOne(@Param('id') id:string) {
    return this.homepageService.findOne(id);
  }
}

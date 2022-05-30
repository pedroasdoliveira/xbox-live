import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { CreateHomepageDto } from './dto/create-homepage.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  // @Post()
  // create(@Body() createHomepageDto: CreateHomepageDto) {
  //   return this.homepageService.create(createHomepageDto);
  // }

  @Get()
  findAll() {
    return this.homepageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homepageService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHomepageDto: UpdateHomepageDto) {
  //   return this.homepageService.update(+id, updateHomepageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.homepageService.remove(+id);
  // }
}

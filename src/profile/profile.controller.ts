import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/User/entities/user.entities';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Perfil de usuário'
  })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista Perfis de usuário'
  })
  findAll(@LoggedUser() user: User) {
    return this.profileService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar Perfil de usuário'
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar Perfil de usuário'
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar Perfil de usuário'
  })
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}

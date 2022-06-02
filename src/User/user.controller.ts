import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// ---------------- imports rotes ---------------------
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar usúarios',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Visualizar usúario',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar cadastro de usúario',
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Editar informações do usúario',
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar Usúario',
  })
  delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}

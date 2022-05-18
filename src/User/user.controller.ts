import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
// ---------------- imports rotes ---------------------
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}

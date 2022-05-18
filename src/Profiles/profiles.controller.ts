import { Controller, Get, Post } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll() {
    return this.profilesService.findAll
  }

  @Post()
  create() {
    return this.profilesService.create
  }
}

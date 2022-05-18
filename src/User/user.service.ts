import { Injectable } from "@nestjs/common";
// --------------- Import rotes -----------------
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entities";

@Injectable()
export class UserService {
  findAll() {
    return
  }

  create(dto: CreateUserDto) {
    return
  }
}

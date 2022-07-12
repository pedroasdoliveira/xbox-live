import { Game } from "src/games/entities/game.entity";

export class Gender {
  id?: string;
  name: string;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}

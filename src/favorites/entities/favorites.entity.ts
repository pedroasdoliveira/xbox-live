import { Game } from "src/games/entities/game.entity";
import { Profile } from "src/profile/entities/profile.entity";

export class Favorites {
  id?: string;
  profile?: Profile[];
  games?: Game[];
  favoriteGames?: Game[];
}

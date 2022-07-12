import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/User/entities/user.entities';

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  user?: User;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}

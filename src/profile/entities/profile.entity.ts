import { Game } from 'src/games/entities/game.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { User } from 'src/User/entities/user.entities';

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  user?: User;
  genders?: Gender;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}

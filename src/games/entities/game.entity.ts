import { Gender } from "src/genders/entities/gender.entity";

export class Game {
  id?: string;
  title: string;
  coverImageUrl: string;
  description: string;
  year: number;
  imbScore: number;
  trailerYoutubeUrl: string;
  gameplayYouTubeUrl: string;
  gender?: Gender[];
  createdAt?: Date;
  updatedAt?: Date;
}

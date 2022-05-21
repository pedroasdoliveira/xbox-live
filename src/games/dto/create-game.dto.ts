import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo',
    example: 'Forza Horizon',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Capa do Jogo',
    example:
      'https://www.gamescast.com.br/wp-content/uploads/2021/03/forza-horizon.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo',
    example: 'Jogo de corrida',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Ano de lançamento',
    example: 2012,
  })
  year: number;

  @IsNumber()
  @ApiProperty({
    description: 'Pontuação do jogo no IMB',
    example: 4.3,
  })
  imbScore: number;

  @IsString()
  @ApiProperty({
    description: 'Trailer do jogo',
    example: 'https://www.youtube.com/watch?v=h_Fy2ke1lR4',
  })
  trailerYoutubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Gameplay',
    example: 'https://www.youtube.com/watch?v=fWJSzIZIowI',
  })
  gameplayYouTubeUrl: string;
}

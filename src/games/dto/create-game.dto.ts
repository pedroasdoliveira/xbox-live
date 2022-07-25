import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo',
    example: 'Forza Horizon',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Capa do Jogo',
    example:
      'https://images5.alphacoders.com/746/746836.jpg',
  })
  coverImageUrl: string;
  
  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo',
    example: 'Jogo de corrida',
  })
  description: string;

  @ApiProperty({
    description: 'Ano de lançamento',
    example: 2012,
  })
  year: number;

  @ApiProperty({
    description: 'Pontuação do jogo no IMB',
    example: 4,
  })
  imbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do jogo',
    example: 'https://www.youtube.com/watch?v=h_Fy2ke1lR4',
  })
  trailerYoutubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay',
    example: 'https://www.youtube.com/watch?v=fWJSzIZIowI',
  })
  gameplayYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Gênero do jogo',
    example: 'FPS'
  })
  genreGame?: string;
}

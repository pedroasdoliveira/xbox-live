import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo',
    example: 'Red Dead Redemption 2',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Capa do Jogo',
    example:
      'https://img.olhardigital.com.br/wp-content/uploads/2021/05/Red-Dead-Redemption-2-Divulgacao.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo',
    example: 'Jogo foda',
  })
  description: string;

  @ApiProperty({
    description: 'Ano de lançamento',
    example: 2018,
  })
  year: number;

  @ApiProperty({
    description: 'Pontuação do jogo no IMB',
    example: 5,
  })
  imbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do jogo',
    example: 'https://www.youtube.com/watch?v=eaW0tYpxyp0',
  })
  trailerYoutubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay',
    example: 'https://www.youtube.com/watch?v=Dw_oH5oiUSE',
  })
  gameplayYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Gênero do jogo',
    example: 'Ação'
  })
  genreGame?: string;
}

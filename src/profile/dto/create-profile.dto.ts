import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID } from "class-validator";
import { createProfileGamesDto } from "./create-profile-games.dto";

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Player_1'
  })
  title: string

  @IsUrl()
  @ApiProperty({
    description: 'Imagem de perfil',
    example: 'https://i.pinimg.com/280x280_RS/ca/94/d0/ca94d0af95d038459ed4d6bfde48f6e7.jpg'
  })
  imageUrl: string

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: ''
  })
  userId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Gênero do jogo',
    example: ''
  })
  genderName: string;

  @IsUUID(undefined, {each: true})
  @ApiProperty({
    description: 'Jogos',
    example: '',
  })
  game: createProfileGamesDto[]
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUrl, IsUUID, ValidateNested } from "class-validator";
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
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936'
  })
  userId: string;

  @IsString()
  @ApiProperty({
    description: 'Gênero do jogo',
    example: 'Suspense'
  })
  genderName: string;

  @ValidateNested({
    each: true
  })
  @Type(() => createProfileGamesDto)
  @ApiProperty({
    description: 'Jogo escolhido',
    type: [createProfileGamesDto],
  })
  game: createProfileGamesDto[]
}

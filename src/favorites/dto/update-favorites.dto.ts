import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateFavoritesDto {
  @IsString()
  @ApiProperty({
    description: 'id do game',
    example: ''
  })
  gameId?: string

  @IsString()
  @ApiProperty({
    description: 'id do game para adicionar ou remover da lista de favoritos',
    example: ''
  })
  favoriteGameId?: string
}

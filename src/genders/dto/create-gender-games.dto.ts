import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateGenderGamesDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo a ser adicionado no gênero',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40'
  })
  gamesId: string;
}

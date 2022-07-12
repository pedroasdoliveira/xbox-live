import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class createProfileGamesDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo a ser adicionado no perfil',
    example: 'fbe611b7-34b1-4739-8b9e-418765b69942',
  })
  gamesId: string;
}

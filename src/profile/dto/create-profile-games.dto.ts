import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class createProfileGamesDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo a ser adicionado no perfil',
    example: '',
  })
  gamesId: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateGenderGamesDto } from "./create-gender-games.dto";

export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description: "Gênero do(s) jogo(s)",
    example: "Suspense",
  })
  name: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do jogo a ser adicionado no gênero',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40'
  })
  gamesId?: string;

  // @ValidateNested({
  //   each: true
  // })
  // @Type(() => CreateGenderGamesDto)
  // @ApiProperty({
  //   description: 'Jogo por gênero',
  //   type: [CreateGenderGamesDto]
  // })
  // games?: CreateGenderGamesDto[];
}

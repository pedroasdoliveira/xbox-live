import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateGenderGamesDto } from "./create-gender-games.dto";

export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description: "Gênero do(s) jogo(s)",
    example: "Suspense",
  })
  name: string;

  @ValidateNested({
    each: true
  })
  @Type(() => CreateGenderGamesDto)
  @ApiProperty({
    description: 'Jogo por gênero',
    type: [CreateGenderGamesDto]
  })
  games?: CreateGenderGamesDto[];
}

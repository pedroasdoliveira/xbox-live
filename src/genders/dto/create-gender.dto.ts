import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description: "Gênero do(s) jogo(s)",
    example: "Suspense",
  })
  name: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateGenderDto {
  @ApiProperty({
    description: "Gênero do(s) jogo(s)",
    example: "Suspense",
  })
  name: string;
}

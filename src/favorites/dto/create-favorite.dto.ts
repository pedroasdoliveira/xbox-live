import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateFavoritesDto {
  @IsUUID()
  @ApiProperty({
    description: 'id do game',
    example: 'aa0b6991-0089-4877-9fee-da6eb9f316de'
  })
  gameId: string
}

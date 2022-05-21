import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Usúario',
    example: 'Pedro',
  })
  name: string;

  email: string;

  password: string;

  cpf: string;

  isAdmin?: boolean;
}

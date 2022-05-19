import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'usúarios disponiveis',
    example: {
      name: 'Pedro',
      email: 'pedrogm@gmail.com',
      password: 45493,
      cpf: 567893280,
    },
  })
  name: String;
  email: String;
  password: Number;
  cpf: Number;
  isAdmin?: String;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Usúario',
    example: 'Lazaro',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'LazaroKiller@hotmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'Viado123',
  })
  password: string;

  @IsNumber()
  @ApiProperty({
    example: 5556338503394,
  })
  cpf: number;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  isAdmin?: boolean;
}

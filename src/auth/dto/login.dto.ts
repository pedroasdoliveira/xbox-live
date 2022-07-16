import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'pedroaolive@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Pa44528033#',
  })
  password: string;
}

// admin =
// "nicname": "Destino_veleiro"
// "password": "Pxl@4568#"

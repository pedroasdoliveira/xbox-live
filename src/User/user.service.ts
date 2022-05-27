import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
// --------------- Import rotes -----------------
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    nickname: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: false,
  }

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
     });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (!cpf.isValid(dto.cpf)) {
      throw new BadRequestException('CPF não é valido')
    }

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      cpf: cpf.format(dto.cpf)
     };

    return this.prisma.user.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.cpf) {
      if (!cpf.isValid(dto.cpf)) {
        throw new BadRequestException('CPF não é valido')
      }
    }

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    if (data.cpf) {
      data.cpf = cpf.format(data.cpf)
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user.delete({
      where: { id },
    }).catch(this.handleError);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}

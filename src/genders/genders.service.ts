import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entities';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.genders.findMany({
      include: {
        gamesGender: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.genders.findUnique({
      where: { id },
      include: {
        gamesGender: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  create(createGenderDto: CreateGenderDto, user: User): Promise<Gender> {
    if (user.isAdmin) {
      const data: Prisma.GendersCreateInput = {
        name: createGenderDto.name,
      };

      return this.prisma.genders.create({ data }).catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  async update(
    id: string,
    updateGenderDto: UpdateGenderDto,
    user: User,
  ): Promise<Gender> {
    if (user.isAdmin) {
      await this.findById(id);

      const data: Prisma.GendersUpdateInput = {
        name: updateGenderDto.name,
      };

      return this.prisma.genders.update({
        where: { id },
        data,
      });
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);

      await this.prisma.genders
        .delete({
          where: { id },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
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

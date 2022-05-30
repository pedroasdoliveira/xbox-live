import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Gender[]> {
    return this.prisma.genders.findMany();
  }

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.genders.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const data: Prisma.GendersCreateInput = {
      name: createGenderDto.name,
      gamesGender: {
        connect: {
          id: createGenderDto.gamesId
        }
      }
     };

    return this.prisma.genders.create({ data }).catch(this.handleError);
  }

  async update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    await this.findById(id);

    const data: Prisma.GendersUpdateInput = {
      name: updateGenderDto.name,
     };

    return this.prisma.genders.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.genders.delete({
      where: {id},
    }).catch(this.handleError)
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

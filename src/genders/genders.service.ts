import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
    const data: Gender = { ...createGenderDto };

    return this.prisma.genders.create({ data }).catch(this.handleError);
  }

  async update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    await this.findById(id);

    const data: Partial<Gender> = { ...updateGenderDto };

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
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}

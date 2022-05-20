import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  create(createGenderDto: CreateGenderDto) {
    return 'This action adds a new gender';
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  delete(id: number) {
    return `This action removes a #${id} gender`;
  }
}

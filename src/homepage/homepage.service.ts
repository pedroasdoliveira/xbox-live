import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const profileData = await this.prisma.profile.findUnique({
      where: {id: ''},

    })

    const gameData = this.prisma.genders.findMany({
      include: {
        gamesGender: true,
      }
    })
  }

  findOne(id: string) {

  }

  create() {

  }

}

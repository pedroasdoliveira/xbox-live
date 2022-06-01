import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.profile.findFirst({
      where: {id},
      include: {
        games: true,
      }
    })
  }
}

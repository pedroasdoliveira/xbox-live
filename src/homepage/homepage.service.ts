import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
     const profileData = await this.prisma.profile.findUnique({
      where: {id},
      include: {
        user: {
          select: {
            nickname: true,
          }
        },
        games: {
          include: {
            genders: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const allGenres = await this.prisma.genders.findMany({
      include: {
        gamesGender: {
          select: {
            title: true,
          },
        },
      },
    });

    return {
      profileData,
      allGenres,
    }
  }
}

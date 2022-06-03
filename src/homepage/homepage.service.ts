import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
     const profileData = await this.prisma.profile.findUnique({
      where: {id},
      select: {
        title: true,
        imageUrl: true,
        user: {
          select: {
            nickname: true,
            isAdmin: true,
          }
        },
        games: {
          select: {
            title: true,
            coverImageUrl: true,
            description: true,
            imbScore: true,
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
      select: {
        name: true,
        gamesGender: {
          select: {
            title: true,
            coverImageUrl: true,
          }
        }
      }
    });

    return {
      profileData,
      allGenres,
    }
  }
}

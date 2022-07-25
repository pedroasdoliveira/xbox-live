import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        title: true,
        imageUrl: true,
        user: {
          select: {
            nickname: true,
            isAdmin: true,
          },
        },
        favoriteGames: {
          select: {
            games: {
              select: {
                id: true,
                title: true,
                coverImageUrl: true,
                description: true,
                imbScore: true,
                year: true,
                genders: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        games: {
          select: {
            id: true,
            title: true,
            coverImageUrl: true,
            description: true,
            imbScore: true,
            year: true,
            genders: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const listGames = profileData.games;
    const orderedGames = [];

    const allGenres = await this.prisma.genders.findMany();
    allGenres.map((genrer) => {
      const gamesPerGenrer = [];

      listGames.map((game) => {
        if (game.genders[0].name === genrer.name) {
          gamesPerGenrer.push(game.title);
        }
      });
      const genrerObj = {
        genrer: genrer.name,
        title: gamesPerGenrer,
      };

      if (gamesPerGenrer.length !== 0) {
        orderedGames.push(genrerObj)
      }
    });

    return {
      profileData,
      genrerList: orderedGames,
    };
  }
}

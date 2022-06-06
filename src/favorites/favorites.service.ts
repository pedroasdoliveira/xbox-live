import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        games: {
          select: {
            title: true,
            coverImageUrl: true,
            description: true,
            imbScore: true,
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
              }
            },
            id: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async addFavorites(profileId: string, gameId: string) {
    const user = await this.findAll(profileId);
    let favoriteGame = false;
    user.favoriteGames.games.map((game) => {
      if (gameId === game.id) {
        favoriteGame = true;
      }
    });

    if (favoriteGame) {
      return await this.prisma.favoriteGames.update({
        where: {
          id: user.favoriteGames.id,
        },
        data: {
          games: {
            disconnect: {
              id: gameId,
            },
          },
        },
      });
    } else {
      return await this.prisma.favoriteGames.update({
        where: {
          id: user.favoriteGames.id,
        },
        data: {
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }
  }
}

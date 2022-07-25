import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        games: {
          select: {
            id: true,
            title: true,
            coverImageUrl: true,
            description: true,
            imbScore: true,
            year: true,
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
              },
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

  async addFavoriteOrRemove(profileId: string, gameId: string) {
    const user = await this.findAll(profileId);
    let favoritedGame = false;

    if (user.favoriteGames != null) {
      user.favoriteGames.games.map((game) => {
        if (gameId === game.id) {
          favoritedGame = true;
        }
      });
    }
    else {
      return this.prisma.favoriteGames.create({
        data: {
          profile: {
            connect: {
              id: profileId,
            },
          },
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }

    if (favoritedGame) {
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
    }
    else {
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

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}

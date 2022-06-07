import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
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

  async addFavorites(id: string, gameId: string) {
    const user = await this.findAll(id);
    let favoriteGame = false;
    user.favoriteGames.games.map((game) => {
      if (gameId === game.id) {
        favoriteGame = true;
      }
    });

    if (favoriteGame) {
      return await this.prisma.favoriteGames
        .update({
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
        })
        .catch(this.handleError);
    } else {
      return await this.prisma.favoriteGames
        .update({
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
        })
        .catch(this.handleError);
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

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entities';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.games.findMany({
      include: {
        genders: true,
      },
    });
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.games.findUnique({
      where: { id },
      include: {
        genders: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(createGameDto: CreateGameDto, user: User): Promise<Game> {
    if (user.isAdmin) {
      const data: Prisma.GamesCreateInput = {
        title: createGameDto.title,
        coverImageUrl: createGameDto.coverImageUrl,
        year: createGameDto.year,
        description: createGameDto.description,
        imbScore: createGameDto.imbScore,
        gameplayYouTubeUrl: createGameDto.gameplayYouTubeUrl,
        trailerYoutubeUrl: createGameDto.trailerYoutubeUrl,
        genders: {
          connectOrCreate: {
            where: { name: createGameDto.genreGame },
            create: {
              name: createGameDto.genreGame,
            },
          },
        },
      };

      return await this.prisma.games
        .create({
          data,
          include: {
            genders: true,
          },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  async update(
    id: string,
    updateGameDto: UpdateGameDto,
    user: User,
  ): Promise<Game> {
    if (user.isAdmin) {
      const data: Prisma.GamesUpdateInput = {
        title: updateGameDto.title,
        coverImageUrl: updateGameDto.coverImageUrl,
        description: updateGameDto.description,
        gameplayYouTubeUrl: updateGameDto.gameplayYouTubeUrl,
        year: updateGameDto.year,
        imbScore: updateGameDto.imbScore,
        trailerYoutubeUrl: updateGameDto.trailerYoutubeUrl,
        genders: {
          connect: {
            name: updateGameDto.genreGame,
          },
        },
      };

      return this.prisma.games.update({
        where: { id },
        data,
        include: {
          genders: true,
        },
      });
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);

      await this.prisma.games
        .delete({
          where: { id },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}

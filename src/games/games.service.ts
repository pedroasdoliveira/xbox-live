import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.games.findMany({
      include: {
        genders: true
      }
    });
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.games.findUnique({
      where: { id },
      include: {
        genders: {
          select: {
            name: true
          }
        }
      }
     });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const data: Prisma.GamesCreateInput = {
      title: createGameDto.title,
      coverImageUrl: createGameDto.coverImageUrl,
      year: createGameDto.year,
      description: createGameDto.description,
      imbScore: createGameDto.imbScore,
      gameplayYouTubeUrl: createGameDto.gameplayYouTubeUrl,
      trailerYoutubeUrl: createGameDto.trailerYoutubeUrl,
      genders: {
        connect: {
          name: createGameDto.genreGame
        }
      }
    };

    return await this.prisma.games.create({
      data,
      include: {
        genders: true
      }
     }).catch(this.handleError);
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const actualGame =  await this.findById(id);

    const data: Prisma.GamesUpdateInput = {
      title: updateGameDto.title,
      coverImageUrl: updateGameDto.coverImageUrl,
      description: updateGameDto.description,
      gameplayYouTubeUrl: updateGameDto.gameplayYouTubeUrl,
      year: updateGameDto.year,
      imbScore: updateGameDto.imbScore,
      trailerYoutubeUrl: updateGameDto.trailerYoutubeUrl,
      genders: {
        disconnect: {
          name: actualGame.gender[0].name
        },
        connect: {
          name: updateGameDto.genreGame
        }
      }
     };

    return this.prisma.games.update({
      where: { id },
      data,
      include: {
        genders: true
      }
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({
      where: { id },
    }).catch(this.handleError);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      user: {
        connect: {
          id: createProfileDto.userId,
        },
      },
      title: createProfileDto.title,
      imageUrl: createProfileDto.imageUrl,
      genders: {
        connect: {
          name: createProfileDto.genderName,
        },
      },
      games: {
        createMany: {
          data: createProfileDto.game.map((createProfileDto) => ({
            gamesId: createProfileDto.gamesId,
          })),
        },
      },
    };
    return this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: {
            select: {
              name: true,
              nickname: true,
            },
          },
          games: {
            select: {
              games: true,
            },
          },
        },
      })
      .catch(this.handleError);
  }

  findAll() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            name: true,
            nickname: true,
          },
        },
        games: {
          select: {
            games: true,
          },
        },
        _count: {
          select: {
            games: true,
          }
        }
      },
    });
  }

  findOne(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            nickname: true,
          },
        },
        games: {
          select: {
            games: {
              select: {
                title: true,
                coverImageUrl: true,
                description: true,
                year: true,
                imbScore: true,
                trailerYoutubeUrl: true,
                gameplayYouTubeUrl: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const data: Prisma.ProfileUpdateInput = {
      
    };
  }

  delete(id: string) {
    return `This action removes a #${id} profile`;
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

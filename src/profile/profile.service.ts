import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entities';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

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
    };
    return this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: true,
        },
      })
      .catch(this.handleError);
  }

  findAll(user: User) {
    return this.prisma.profile.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            nickname: true,
            email: true,
            isAdmin: true,
          }
        },
        games: true
      }
    });
  }

  async findById(id: string): Promise<Profile> {
    const record = await this.prisma.profile.findUnique({
      where: {id},
      include: {
        games: true,
      },
    });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const data: Prisma.ProfileUpdateInput = {
      title: updateProfileDto.title,
      imageUrl: updateProfileDto.imageUrl,
      user: {
        connect: {
          id: updateProfileDto.userId
        }
      },
    };

    return this.prisma.profile.update({
      where: {id},
      data,
    })
  }

  async delete(id: string) {
    await this.findById(id)
    return this.prisma.profile.delete({where: {id}});
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

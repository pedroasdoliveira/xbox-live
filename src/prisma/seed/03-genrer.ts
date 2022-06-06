import { Prisma, PrismaClient } from '@prisma/client';

export const genrers: Prisma.GendersCreateInput[] = [
  {
    name: 'RPG',
  },
  {
    name: 'Corrida',
  },
  {
    name: 'Mundo aberto',
  },
  {
    name: 'Ação',
  },
  {
    name: 'Aventura',
  },
];

export const genrer = async (prisma: PrismaClient) => {
  for (const obj of Object.values(genrers)) {
    await prisma.genders.upsert({
      where: {name: obj.name},
      update: {},
      create: {
        ...obj,
      }
    })
  }
}

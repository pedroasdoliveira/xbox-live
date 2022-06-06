import { Prisma, PrismaClient } from "@prisma/client";

export const games: Prisma.GamesCreateInput[] = [
  {
    title: 'The Witcher 3',
    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png',
    description: 'Jogo épico de aventura e rpg baseado nos contos de Andrzej Sapkowski ',
    year: 2015,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=zAhd0FiywfU',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=xx8kQ4s5hCY'
  },
  {
    title: 'Forza Horizon',
    coverImageUrl: 'https://www.gamescast.com.br/wp-content/uploads/2021/03/forza-horizon.jpg',
    description: 'Jogo de corrida',
    year: 2012,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=h_Fy2ke1lR4',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=fWJSzIZIowI'
  },
]

export const game = async (prisma: PrismaClient) => {
  for (const obj of Object.values(games)) {
    await prisma.games.upsert({
      where: {title: obj.title},
      update: {},
      create: {
        ...obj,
      }
    })
  }
}

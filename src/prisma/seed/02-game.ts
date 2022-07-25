import { Prisma, PrismaClient } from "@prisma/client";

export const games: Prisma.GamesCreateInput[] = [
  {
    title: 'The Witcher 3',
    coverImageUrl: 'https://gamehall.com.br/wp-content/uploads/2015/11/The-Witcher-3-Wallpaper-Full-HD-Geralt-e-Espada-1920x1200.jpg',
    description: 'Jogo épico de aventura e rpg baseado nos contos de Andrzej Sapkowski ',
    year: 2015,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=zAhd0FiywfU',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=xx8kQ4s5hCY'
  },
  {
    title: 'Forza Horizon',
    coverImageUrl: 'https://images5.alphacoders.com/746/746836.jpg',
    description: 'Jogo de corrida',
    year: 2012,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=h_Fy2ke1lR4',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=fWJSzIZIowI'
  },
  {
    title: 'Halo Infinite',
    coverImageUrl: 'https://sm.ign.com/ign_pt/screenshot/default/d7d71318-7c6d-4083-8351-f9b0b1e39ff0_g471.jpg',
    description: 'Excelente jogo exclusivo da Microsoft contanto a historia do Master Chef',
    year: 2021,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=PyMlV5_HRWk',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=YoWhmo3W2wc',
  },
  {
    title: 'Forza Horizon 5',
    coverImageUrl: 'https://images.alphacoders.com/116/thumb-1920-1168382.jpg',
    description: 'Forza Horizon 5 é um jogo eletrônico de corrida desenvolvido pela Playground Games e publicado pela Xbox Game Studios. É o quinto jogo da série Forza Horizon e o décimo segundo título principal da franquia Forza. O jogo se passa em uma representação ficcional do México.',
    year: 2021,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=FYH9n37B7Yw',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=E2Ah8Dr9o2I'
  },
  {
    title: 'Alan Wake Remastered',
    coverImageUrl: 'https://i0.wp.com/gamehall.com.br/wp-content/uploads/2021/09/alan-wake-remastered.jpg?fit=1920%2C1080&ssl=1',
    description: 'Excelente remastered',
    year: 2021,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=5Kz_lcugd5E',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=ScyOqZmM-iM',
  },
  {
    title: 'Elden Ring',
    coverImageUrl: 'https://images4.alphacoders.com/115/thumb-1920-1151249.jpg',
    description: 'Elden Ring é um jogo eletrônico de RPG de ação desenvolvido pela FromSoftware e publicado pela Bandai Namco Entertainment. O jogo é um projeto colaborativo entre o diretor Hidetaka Miyazaki e o romancista de fantasia George R. R. Martin.',
    year: 2022,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=E3Huy2cdih0',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=JldMvQMO_5U',
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

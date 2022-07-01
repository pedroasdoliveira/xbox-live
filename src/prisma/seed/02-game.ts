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
  {
    title: 'Halo Infinite',
    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/d1/Halo_Infinite_capa.png',
    description: 'Excelente jogo exclusivo da Microsoft contanto a historia do Master Chef',
    year: 2021,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=PyMlV5_HRWk',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=YoWhmo3W2wc',
  },
  {
    title: 'Forza Horizon 5',
    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/dc/Capa_de_Forza_Horizon_5.jpg',
    description: 'Forza Horizon 5 é um jogo eletrônico de corrida desenvolvido pela Playground Games e publicado pela Xbox Game Studios. É o quinto jogo da série Forza Horizon e o décimo segundo título principal da franquia Forza. O jogo se passa em uma representação ficcional do México.',
    year: 2021,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=FYH9n37B7Yw',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=E2Ah8Dr9o2I'
  },
  {
    title: 'Alan Wake Remastered',
    coverImageUrl: 'https://elamigosedition.com/uploads/posts/2021-10/1633962915_alan-wake-remastered-cover-download.webp',
    description: 'Excelente remastered',
    year: 2021,
    imbScore: 4,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=5Kz_lcugd5E',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=ScyOqZmM-iM',
  },
  {
    title: 'Elden Ring',
    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/0/0d/Elden_Ring_capa.jpg',
    description: 'Elden Ring é um jogo eletrônico de RPG de ação desenvolvido pela FromSoftware e publicado pela Bandai Namco Entertainment. O jogo é um projeto colaborativo entre o diretor Hidetaka Miyazaki e o romancista de fantasia George R. R. Martin.',
    year: 2022,
    imbScore: 5,
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=E3Huy2cdih0',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=JldMvQMO_5U',
  }
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

import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { cpf } from "cpf-cnpj-validator";

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Pedro',
    nickname: 'Ghost',
    email: 'Pedroalo@hotmail.com',
    password: 'Pxl@4568#',
    cpf: '278.442.374-30',
    isAdmin: true,
  },
  {
    name: 'Pedro Oliveira',
    nickname: 'Destino_veleiro',
    email: 'pedroaolive@gmail.com',
    password: 'Pa44528033#',
    cpf: '518.842.108-99',
    isAdmin: true,
  },
  {
    name: 'Lazaro',
    nickname: 'lazaroKiller',
    email: 'LazaroKiller@hotmail.com',
    password: 'Lzra@16376',
    cpf: '480.712.615-64',
    isAdmin: false,
  },
  {
    name: 'Gabriel',
    nickname: 'GabsRoblox',
    email: 'Gabs@hotmail.com',
    password: 'Gab@6367#Roblox',
    cpf: '119.116.050-54',
    isAdmin: false,
  },
  {
    name: 'Vini',
    nickname: 'Violigon',
    email: 'Violigon@gmail.com',
    password: 'Vio#255CODE*',
    cpf: '363.155.000-64',
    isAdmin: false,
  }
]

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: {nickname: obj.nickname},
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
        cpf: cpf.format(obj.cpf)
      }
    })
  }
}

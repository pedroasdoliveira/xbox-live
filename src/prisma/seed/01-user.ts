import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { cpf } from "cpf-cnpj-validator";

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Pedro',
    nickname: 'Destino_veleiro',
    email: 'Pedroalo@hotmail.com',
    password: 'Pxl@4568#',
    cpf: '278.442.374-30',
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

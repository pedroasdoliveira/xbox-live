import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { cpf } from "cpf-cnpj-validator";

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Pedro',
    nickname: 'Px_gamer01',
    email: 'Pedroalo@hotmail.com',
    password: 'Px@46175#',
    cpf: '119.116.050-54',
    isAdmin: true,
  },
  {
    name: 'Lazaro',
    nickname: 'lazaroKiller',
    email: 'LazaroKiller@hotmail.com',
    password: 'Lzra@16376',
    cpf: '48071261564',
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

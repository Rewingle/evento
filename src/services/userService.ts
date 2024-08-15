"use server"
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const insertUser = async (user: any) => {

  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

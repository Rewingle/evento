"use server"
import { db } from '@/lib/db';

export const insertUser = async (user: any) => {
  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,

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

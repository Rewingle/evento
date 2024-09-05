"use server"
import { auth } from "@/auth";

export async function useCurrentUser() {
  const session = await auth();

  return session?.user;
}

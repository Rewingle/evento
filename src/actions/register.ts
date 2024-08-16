"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import { insertUser } from "@/services/userService"

export const login = async (
    values: z.infer<typeof RegisterSchema>,
) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }
    const { name, email, password } = validatedFields.data;
    
    try {
        const res = await insertUser({ name, email, password })
        if(!res) {
            return { error: "Something went wrong!" }
        }
        return res

    } catch {
        return { error: "Something went wrong!" }
    }
}
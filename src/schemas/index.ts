import * as z from "zod"

export const genres = ["rock", "metal", "pop", "jazz", "blues", "hip-hop", "rap", "classical", "country", "reggae",
    "folk", "indie", "electronic", "dance", "house", "techno", "trance", "dubstep", "punk", "alternative"] as const

const genreEnum = z.enum(genres)

export const RegisterSchema = z.object({
    name: z.string()
        .min(2, { message: '🔴 Name must be minimum 2 characters' })
        .max(20, { message: '🔴 Name must be maximum 20 characters' }),
    email: z.string()
        .email({ message: '🔴 Invalid email address' }),
    password: z.string()
        .min(6, { message: '🔴 Password must be minimum 6 characters' })
        .max(255, { message: '🔴 Password must be maximum 255 characters' }),
    dob: z.any(),
    gender: z.enum(["female", "male"]),
    terms: z.literal(0).or(z.literal(1))
})
export const CompleteProfileStepOne = z.object({
    profilePictureUrl: z.string().optional(),
    bio: z.string().min(1).max(255, { message: '🔴 Bio must be maximum 255 characters' }).optional(),
})
export const RegisterStepTwoSchema = z.object({
    gender: z.enum(["female", "male", ""]),
    dob: z.any(),
    preferedGenres: z.enum(genres).optional(),
})

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: '🔴 Invalid email address' }),
    password: z.string()
        .min(6, { message: '🔴 Password must be minimum 6 characters' })
        .max(255, { message: '🔴 Password must be maximum 255 characters' })
})
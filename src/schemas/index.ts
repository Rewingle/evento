import * as z from "zod"

const genres = ["rock", "metal", "pop", "jazz", "blues", "hip-hop", "rap", "classical", "country", "reggae",
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
    terms: z.literal(0).or(z.literal(1))
})
export const RegisterStepOneSchema = z.object({
    profilePictureUrl: z.string().optional(),
    bio: z.string().min(1).max(255, { message: '🔴 Bio must be maximum 255 characters' }).optional(),
})
export const RegisterStepTwoSchema = z.object({
    gender: z.enum(["female", "male", ""]),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    preferedGenres: z.array(genreEnum).or(z.null())
})

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: '🔴 Invalid email address' }),
    password: z.string()
        .min(6, { message: '🔴 Password must be minimum 6 characters' })
        .max(255, { message: '🔴 Password must be maximum 255 characters' })
})
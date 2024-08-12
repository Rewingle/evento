"use client"
import React, { startTransition, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { SendHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertUser } from '@/services/user'
import Link from 'next/link'

type Props = {}

const LoginCard = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: 0
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values)
        startTransition(() => {
            insertUser(values).then((res) => {
                alert('Logged In')
            }).catch((err) => {
                alert(err)
            })
        })

    }


    return (
        <div className='shadow-xl rounded-lg w-96 h-[400px]'>
            <div className='w-full h-12 bg-black rounded-t-lg flex items-center'>
                <div className='text-white ml-4 text-xl'>REGISTER</div>
            </div>
            <div className='p-8'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input {...register("email")} placeholder="Email" type="text" name="email"></Input>
                    <div className='h-8 flex items-center'>
                        {errors.email && <p className='text-sm text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <Input {...register("password")} placeholder="Password" type="password" name="password"></Input>
                    <div className='h-8 flex items-center'>
                        {errors.password && <p className='text-sm text-red-500'>{errors.password?.message}</p>}
                    </div>
                    <div className='flex'>

                        <span className='flex justify-end'>
                            <Button type="submit" className='w-24'>
                                <SendHorizontal size={18} />
                            </Button>
                        </span>
                    </div>



                </form>
            </div>
            <div className='w-full text-center'>
                <Link href={'/login'} className='hover:underline text-sm text-center'>Already have an account?</Link>
            </div>
        </div>
    )
}

export default LoginCard
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertUser } from '@/services/user';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState } from 'react'
import * as z from "zod";
import { RegisterSchema } from '@/schemas';
import { useForm, Controller } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';

type Props = {}

export default function RegisterCard({ }: Props) {

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
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
        console.log('ACCEPT TERMS PLS')
        if (!terms) {
            console.log('ACCEPT TERMS PLS')
            setError("You must have accept Terms and Conditions")
            return;
        }
        setSuccess("");
        console.log(values)
        startTransition(() => {
            insertUser(values).then((res) => {
                alert('User created')
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
                    <Input {...register("name")} placeholder="Name" type="text" name="name"></Input>
                    <div className='h-8 flex items-center'>
                        {errors.name && <p className='text-sm text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <Input {...register("email")} placeholder="Email" type="text" name="email"></Input>
                    <div className='h-8 flex items-center'>
                        {errors.email && <p className='text-sm text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <Input {...register("password")} placeholder="Password" type="password" name="password"></Input>
                    <div className='h-8 flex items-center'>
                        {errors.password && <p className='text-sm text-red-500'>{errors.password?.message}</p>}
                    </div>
                    <div className='flex'>
                        <span className="flex items-center space-x-2 w-full">
                            <Checkbox onCheckedChange={() => setTerms(!terms)}/>
                            <Label htmlFor="terms">Accept <a href="" className='underline'>terms & conditions</a></Label>
                        </span>
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
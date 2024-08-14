"use client"
import React, { startTransition, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { useSearchParams } from "next/navigation";

import { SendHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { LoginSchema, RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertUser } from '@/services/user'
import Link from 'next/link'
import { login } from '@/actions/login'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type Props = {}

const LoginCard = (props: Props) => {

    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {

            email: "",
            password: "",

        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
        startTransition(() => {
            login(values, callbackUrl)
                .then((res) => {
                    if (res?.error) {
                        form.reset();
                    }
                    alert('Logged In')
                }).catch((err) => {
                    alert(err)
                })
        })

    }


    return (
        <div className='shadow-xl rounded-lg w-96 h-[360px]'>
            <div className='w-full h-12 bg-black rounded-t-lg flex items-center'>
                <div className='text-white ml-4 text-xl'>LOGIN</div>
            </div>
            <div className='p-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>


                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="john.doe@example.com"
                                                type="email"
                                            />
                                        </FormControl>
                                    </FormItem>

                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>

                                    </FormItem>

                                )}
                            />
                        </div>
                        <br />
                        <div className='grid grid-cols-2'>
                            <Button
                                size="sm"
                                variant="link"
                                asChild
                                className="px-0 font-normal"
                            >
                                <Link href="/auth/reset">Forgot password?</Link>
                            </Button>
                            <Button disabled={isPending} type="submit" className="w-full">
                                <SendHorizontal size={18} />
                            </Button>
                        </div>

                    </form>
                </Form>

            </div>
            <div className='w-full text-center'>
                <Link href={'/register'} className='hover:underline text-sm text-center'>You don't have an account?</Link>
            </div>
        </div>
    )
}

export default LoginCard
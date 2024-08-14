"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertUser } from '@/services/user';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from 'react'
import * as z from "zod";
import { RegisterSchema } from '@/schemas';
import { useForm, Controller } from 'react-hook-form';
import { SendHorizontal } from 'lucide-react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type Props = {}

export default function RegisterCard({ }: Props) {

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof RegisterSchema>>({
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
        startTransition(() => {
            insertUser(values).then((res: any) => {
                if (res?.error) {
                    form.reset();
                }
                alert('User Registered')
            }).catch((err) => {
                alert(err)
            })
        })

    }

    return (
        <div className='shadow-xl rounded-lg w-96 h-[450px]'>
            <div className='w-full h-12 bg-black rounded-t-lg flex items-center'>
                <div className='text-white ml-4 text-xl'>REGISTER</div>
            </div>
            <div className='p-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder='Name' />
                                        </FormControl>
                                        <div className='h-8'><FormMessage /></div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} type='email' placeholder='Email' />
                                        </FormControl>
                                        <div className='h-8'><FormMessage /></div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder='Password' type='password' />
                                        </FormControl>
                                        <div className='h-8'><FormMessage /></div>
                                    </FormItem>
                                )}
                            />

                            <div className='flex'>
                                <span className="flex items-center space-x-2 w-full">
                                    <Checkbox onCheckedChange={() => setTerms(!terms)} />
                                    <Label htmlFor="terms">Accept <a href="" className='underline'>terms & conditions</a></Label>
                                </span>
                                <span className='flex justify-end'>
                                    <Button type="submit" className='w-24'>
                                        <SendHorizontal size={18} />
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
            <div className='w-full text-center'>
                <Link href={'/login'} className='hover:underline text-sm text-center'>Already have an account?</Link>
            </div>
        </div>
    )
}
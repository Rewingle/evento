"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertUser } from '@/services/userService';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from 'react'
import * as z from "zod";
import { RegisterSchema, RegisterStepOneSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { MapPin, SendHorizontal } from 'lucide-react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import Image from 'next/image';
import Logo from '@/app/icon.svg'
import { login } from '@/actions/login';
import { Textarea } from './ui/textarea';

type Props = {}

export default function RegisterCard({ }: Props) {

    const [error, setError] = useState<string>("");
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

        if (!terms) {
            setError("You must have accept Terms and Conditions")
            return;
        }
        startTransition(() => {
            insertUser(values).then((res: any) => {
                if (res?.error) {
                    form.reset();
                }
            }).catch((err) => {
                alert(err)
            })
        })

    }

    return (
        <>
            {true ? <StepOne name='testName' /> : <div className='shadow-xl rounded-lg w-96 h-[450px]'>
                <div className='w-full h-12 bg-black rounded-t-lg flex justify-between items-center'>
                    <div className='text-white ml-4 text-xl'>REGISTER</div>
                    <div><Image width={64} height={64} src={Logo} alt='logo' /></div>
                </div>
                <div className='p-8'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
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
            </div>}
        </>
    )
}

const StepOne = (props: { name: string }) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterStepOneSchema>>({
        resolver: zodResolver(RegisterStepOneSchema),
        defaultValues: {
            profilePictureUrl: "",
            bio: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterStepOneSchema>) => {

        startTransition(() => {
            insertUser(values).then((res: any) => {
                if (res?.error) {
                    form.reset();
                }
            }).catch((err) => {
                alert(err)
            })
        })

    }

    return (
        <div className='w-full' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                  
                        <div className='grid grid-cols-8 grid-rows-2 w-full h-24'>
                            <div className='size-full relative justify-center items-center row-span-2 col-span-2 flex'>
                                <FormField
                                    control={form.control}
                                    name='bio'
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='absolute'><Camera /></div>
                                            <FormControl>
                                                <Input className='rounded-full h-20 bg-black size-24 hover:cursor-pointer' type='file' {...field} disabled={isPending} />
                                            </FormControl>
                                            <div className='h-8'><FormMessage /></div>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className='size-full  row-span-1 col-span-4 flex items-center text-2xl font-bold px-8'>{props.name}</div>
                            <div className='row-span-1 col-span-2 w-full flex text-lg'>
                                <MapPin /><p className='ml-2'>{'Istanbul'}</p>
                            </div>
                            <div className='size-full row-span-1 col-span-4 px-8 text-lg italic'>
                                <FormField
                                    control={form.control}
                                    name='bio'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea className='h-20' {...field} disabled={isPending} placeholder='Bio' />
                                            </FormControl>
                                            <div className='h-8'><FormMessage /></div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                    </div>
                    <br />
                    <div className='flex w-full justify-end'>
                        <span className='flex justify-end'>
                            <Button type="submit" className='w-24 text-white'>
                                NEXT
                            </Button>
                        </span>
                    </div>
                </form>
            </Form>
        </div>
    )
}
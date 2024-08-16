"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertUser } from '@/services/userService';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from 'react'
import * as z from "zod";
import { RegisterSchema, RegisterStepOneSchema, RegisterStepTwoSchema } from '@/schemas';
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
import { Pen } from 'lucide-react';

type Props = {}

export default function RegisterCard({ }: Props) {

    const [error, setError] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [step, setStep] = useState<0 | 1 | 2>(0);

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
            {step == 0 ? <div className='shadow-xl rounded-lg w-96 h-[450px]'>
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
            </div> : step == 1 ? <StepOne name='testName' /> : step == 2 ? <StepTwo name='testName' /> : null}
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
        <div className='w-96' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <h1 className='text-sm flex mb-12 border-b-2 border-dotted py-4 border-black justify-between'><p>Complete your Profile</p> <p>1/3 Steps</p></h1>
                        <div className='grid grid-cols-8 grid-rows-8 w-full h-44'>
                            <div className='flex justify-center items-start row-span-8 col-span-1 '>
                                <FormField
                                    control={form.control}
                                    name='bio'
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='relative flex justify-center items-center'>
                                                <FormControl>
                                                    <Input className='rounded-full bg-black size-20 hover:cursor-pointer' type='file' {...field} disabled={isPending} />
                                                </FormControl>
                                                <div className='absolute flex justify-center items-center z-50 pointer-events-none'>
                                                    <Camera color='white' size={32} />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className='size-full  row-span-2 col-span-7 flex items-center text-2xl font-bold px-8'>{props.name}</div>

                            <div className='size-full row-span-6 col-span-7 px-8 text-lg italic mt-4'>
                                <FormField
                                    control={form.control}
                                    name='bio'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea className='h-24' {...field} disabled={isPending} placeholder='Tell us a bit about yourself...' />
                                            </FormControl>
                                            <div className='h-8'><FormMessage /></div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <br />
                        <div className='flex w-full justify-between'>
                            <span>
                                <Button type="submit" className='w-24 text-black hover:text-white bg-transparent border-black border-2'>
                                    SKIP
                                </Button>
                            </span>
                            <span>
                                <Button type="submit" className='w-24 text-white'>
                                    NEXT
                                </Button>
                            </span>
                        </div>

                    </div>

                </form>
            </Form>
        </div>
    )
}

const StepTwo = (props: { name: string }) => {
    const [isPending, startTransition] = useTransition();
    const [gender, setGender] = useState<"male" | "female" | "">("");

    const form = useForm<z.infer<typeof RegisterStepTwoSchema>>({
        resolver: zodResolver(RegisterStepTwoSchema),
        defaultValues: {
            gender: "",
            dob: "",
            preferedGenres: null
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterStepTwoSchema>) => {

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
        <div className='w-full border-2 border-black p-4 rounded-md' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <div className='hidden'>
                                    <FormControl>
                                        <Input {...field} value={gender} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div>
                        <FormLabel>Gender:</FormLabel>
                        <div className='w-full justify-evenly flex items-center'>
                            <Button className='p-4 bg-blue-700' onClick={() => setGender("male")}>👨 Male</Button>
                            <Button className='p-4 bg-pink-700' onClick={() => setGender("female")}>👩 Female</Button>
                        </div>
                        <FormField
                            control={form.control}
                            name='dob'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea className='h-24' {...field} disabled={isPending} placeholder='Tell us a bit about yourself...' />
                                    </FormControl>
                                    <div className='h-8'><FormMessage /></div>
                                </FormItem>
                            )}
                        />
                        <div className='flex w-full justify-between'>
                            <span>
                                <Button type="submit" className='w-24 text-black hover:text-white bg-transparent border-black border-2'>
                                    SKIP
                                </Button>
                            </span>
                            <span>
                                <Button type="submit" className='w-24 text-white'>
                                    NEXT
                                </Button>
                            </span>
                        </div>

                    </div>

                </form>
            </Form>
        </div>
    )
}
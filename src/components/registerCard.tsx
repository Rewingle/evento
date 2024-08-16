"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertUser } from '@/services/userService';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from 'react'
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { RegisterSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { CalendarIcon, SendHorizontal } from 'lucide-react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import Image from 'next/image';
import Logo from '@/app/icon.svg'
import { login } from '@/actions/login';

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
            dob: null,
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
                console.log(values)
                if (res?.error) {
                    form.reset();
                }
                login(values,'/me/complete-your-profile')

            }).catch((err) => {
                alert(err)
            })
        })

    }

    return (
        <>
            <div className='shadow-xl rounded-lg w-96 h-[580px]'>
                <div className='w-full h-12 bg-black rounded-t-lg flex justify-between items-center'>
                    <div className='text-white ml-4 text-xl'>REGISTER</div>
                    <div><Image width={64} height={64} src={Logo} alt='logo' /></div>
                </div>
                <div className='p-8'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormLabel className='font-bold'>Username:</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder='Name' />
                                            </FormControl>
                                            <div className='h-4'><FormMessage /></div>
                                        </FormItem>
                                    )}
                                />
                                <FormLabel className='font-bold text-sm'>Email: </FormLabel>

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} type='email' placeholder='Email' />
                                            </FormControl>
                                            <div className='h-4'><FormMessage /></div>
                                        </FormItem>
                                    )}
                                />
                                <FormLabel className='font-bold text-sm'>Password: </FormLabel>
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
                                <div className='flex justify-between'>
                                    <div>
                                        <FormLabel className='font-bold text-sm'>Date of Birth: </FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='dob'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) =>
                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <div className='h-8'><FormMessage /></div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel className='font-bold text-sm'>Gender: </FormLabel>
                                        <FormField
                                            control={form.control}
                                            name='gender'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select {...field} onValueChange={field.onChange}>

                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your gender" />
                                                            </SelectTrigger>

                                                            <SelectContent>

                                                                <SelectItem value='male'>{'Male'}</SelectItem>
                                                                <SelectItem value='female'>{'Female'}</SelectItem>

                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <div className='h-8'><FormMessage /></div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <span className="flex items-center space-x-2 w-full">
                                        <Checkbox onCheckedChange={() => setTerms(!terms)} />
                                        <Label htmlFor="terms">Accept <a href="" className='underline'>terms & conditions</a></Label>
                                    </span>
                                    <span className='flex justify-end'>
                                        <Button type="submit" /* onClick={() => setStep({ number: 1, data: { name: 'Deniom' } })} */ className='w-24'>
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
        </>
    )
}

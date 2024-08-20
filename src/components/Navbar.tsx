import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { auth, signOut } from '@/auth'
import Location from '@/components/Location'
import SearchBar from './SearchBar'
import Image from 'next/image'
import { SquareUserRound } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Logo from '@/app/icon.svg'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import axios from 'axios'
type Props = {}

async function Navbar({ }: Props) {

    const session = await auth();
    const { data: cities } = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/cities',
        new URLSearchParams({
          'country': 'nigeria'
        })
      );

    return (
        <div className='w-full fixed bg-white shadow-lg z-50'>
            <div className='grid grid-cols-3 px-24'>
                <div className=' w-full hidden md:flex items-center justify-end'>
                    <SearchBar />
                </div>
                <a href={'/'}>
                    <div className='p-4 flex items-center justify-center h-full'>
                        <Image width={64} height={64} src={Logo} alt='logo' />
                    </div>
                </a>
                
                <div className='h-full flex justify-start items-center'>
                    {session ?
                        <div className='flex space-x-8'>
                            <Popover>
                                <PopoverTrigger>
                                    <div className='hidden md:flex items-center justify-center'>
                                        <MapPin /> {'Istanbul'}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-64'>
                                    <div className='space-y-4'>
                                        <div>Change Address</div>

                                        <Location/>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <div>
                                <Link href={'/me'}>
                                    <SquareUserRound size={42} />
                                </Link>
                            </div>
                            <div>
                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <Button type='submit'>Logout</Button>
                                </form>
                            </div>

                        </div>
                        :
                        <div className='space-x-8 flex'>

                            <Link href={'/register'}>
                                <Button>
                                    Register
                                </Button>
                            </Link>
                            <Link href={'/login'}>
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        </div>}
                </div>

            </div>
        </div>
    )
}

export default Navbar
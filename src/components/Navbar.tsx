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
type Props = {}

async function Navbar({ }: Props) {

    const session = await auth();


    return (
        <div className='w-full h-16 fixed bg-white shadow-lg z-50'>
            <div className='grid grid-cols-3 px-24'>
                <div className=' w-full flex items-center justify-end'>
                    <SearchBar />
                </div>
                <Link href={'/'}>
                    <div className='p-4 flex items-center justify-center h-full'>
                        <Image width={64} height={64} src={Logo} alt='logo'/>
                    </div>
                </Link>

                <div className='h-full flex justify-start items-center'>
                    {session ?
                        <div className='flex space-x-8'>
                            <div className='flex items-center justify-center'>
                                <MapPin/> <Location></Location>
                            </div>
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
                        <div className='space-x-8'>

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
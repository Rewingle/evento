"use client"
import React, { useCallback } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {}

function SearchBar({ }: Props) {

    const [query, setQuery] = React.useState('')
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return (
        <>
            <div className='flex h-full justify-center items-center'>
                <Input onChange={(e) => setQuery(e.target.value)} className='w-64 text-md' placeholder='Search Events...' />

                <Link href={'/search' + '?' + createQueryString('query', query)}>
                    <div className='ml-2 p-2 rounded-full bg-white hover:bg-black transition'>
                        <Search size={24} className='text-black hover:text-white transition'/>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default SearchBar
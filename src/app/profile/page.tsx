import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { MapPin } from 'lucide-react';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

async function Profile() {
    const user = await useCurrentUser();
    return (
        <div className='w-full h-full'>
            {user ? <>
                <div className='grid grid-cols-8 grid-rows-2 w-full h-24'>
                    <div className='size-full  row-span-2 col-span-2 flex justify-end'>
                        <div className='rounded-full bg-black size-24'></div>
                    </div>
                    <div className='size-full  row-span-1 col-span-4 flex items-center text-2xl font-bold px-8'>{user.name}</div>
                    <div className='row-span-1 col-span-2 w-full flex text-lg'>
                        <MapPin /><p className='ml-2'>{'Istanbul'}</p>
                    </div>
                    <div className='size-full row-span-1 col-span-4 px-8 text-lg italic'>{'Bio'}</div>
                    <div className='size-full row-span-1 col-span-2 px-8 text-lg italic flex'><Button><PenLine /><p className='ml-2 text-lg'>Edit</p></Button> </div>
                </div>
                <br />
                <br />
                <h1>My Events:</h1>
                <br />
                <div className='grid grid-flow-col gap-4 h-32'>
                    <div className='bg-slate-200 rounded-md size-full'></div>
                    <div className='bg-slate-200 rounded-md size-full'></div>
                    <div className='bg-slate-200 rounded-md size-full'></div>
                    <div className='bg-slate-200 rounded-md size-full'></div>
                    <div className='bg-slate-200 rounded-md size-full'></div>

                </div>
                <br />
                <div>IMAGES AREA</div>
            </> : null
            }
        </div>
    )
}

export default Profile
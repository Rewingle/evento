import React from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Button } from './ui/button'
import { LockIcon } from 'lucide-react'
interface Person {
    name: string,
    color: string
}

type Props = {
    title: string
    people: Person[]
}

function GroupCard(props: Props) {
    return (
        <div className='w-52 h-60 grid grid-rows-12 shadow-lg rounded-md'>
            <div className='relative py-5 px-4 w-full row-span-4 bg-black rounded-t-md'>
                <Image className='rounded-t-sm opacity-50' fill src={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'} alt='event-card-cover'></Image>
                <div className='absolute font-bold '>
                    <p className='text-white line-clamp-1'>{props.title + ' Meeting'}</p>
                    <p className='absolute font-bold text-white text-xs line-clamp-1'>{props.title}</p>
                </div>

            </div>
            <div className='px-4 py-2 row-span-8 grid grid-rows-12 rounded-b-md shadow-inner bg-gradient-to-t from-slate-950 to-slate-800'>
                <div className='row-span-1 text-gray-400 text-xs'>Members</div>
                <div className='row-span-4 py-2 grid grid-flow-col place-items-center mt font-bold text-white'>
                    {props.people.map((person, index) => (
                        <div key={index} className={`bg-green-500 rounded-full w-7 h-7 flex justify-center items-center text-sm`}>{person.name[0].toUpperCase()}</div>
                    ))}
                    <div className={`bg-gray-500 rounded-full w-7 h-7 flex justify-center items-center text-xs`}>+4</div>
                </div>
                <div className='row-span-2 text-white text-xs flex items-center gap-x-2'>
                    <div><Clock size={12} /></div>
                    <p>Tomorrow</p>
                </div>
                <div className='text-gray-400 row-span-2 text-xs flex gap-x-2'>
                    <LockIcon size={12} /><p>Private group</p>
                </div>
                <div className='row-span-4 flex justify-center items-end'>
                    <Button className='bg-indigo-600 w-full text-sm'>Join</Button>
                </div>
            </div>

        </div>
    )
}

export default GroupCard
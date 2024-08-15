import getEventDetails from '@/actions/getEventDetails'
import React from 'react'
import Image from 'next/image'
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Ticket } from 'lucide-react';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { Castle } from 'lucide-react';
import GroupCard from '@/components/GroupCard';
import { dummyPeople } from '@/lib/dummy';
import RoundedProfilePicture from '@/components/RoundedProfilePicture';


type Props = {}

async function EventDetails({ params }: { params: { id: string } }) {

  const event = await getEventDetails(params.id)

  return (
    <div className='w-full h-full'>

      <div className='font-bold text-2xl mb-4'>{event.name}</div>

      <div className='flex w-full space-x-3 md:space-x-8 px-2 items-center'>
        <Link href={event._embedded.venues[0].url}>
          <div className='text-md flex space-x-2 text-xs text-blue-800'>
            <Castle size={14} /><p>{event._embedded.venues[0].name}</p>
          </div>
        </Link>
        <div className='text-md flex space-x-2 text-xs md:text-sm'><Calendar size={16} /><p>{event.dates.start.localDate}</p></div>
        <div className='text-md flex space-x-2 text-xs md:text-sm'><Clock size={16} /><p>{event.dates.start.localTime.slice(0, -3)}</p></div>
      </div>
      <br />
      <div className='relative w-full h-60'>
        <Image fill src={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'} alt={'event-cover'} />
      </div>
      <br />
      <div className='grid grid-cols-2'>
        <div className='col-span-1'>
          {event.dates.status.code == 'onsale' ?
            <div>
              <div className='flex w-32 justify-between font-bold text-lg items-center text-green-600'>
                <Ticket size={32} /> <p>ON SALE</p>
              </div>
              <Link href={event._embedded.venues[0].url}>
                <div className='w-40 rounded-lg shadow-md p-4 font-bold'>
                  Buy from Biletix
                </div>
              </Link>
            </div>
            :
            <div></div>
          }
        </div>
        <div className='flex justify-end'>
          <div className='w-72 col-span-1'>
            <div className='w-1/3 justify-evenly flex font-bold items-center'><MapPin className='shrink-0' size={16} /> Address</div>
            <hr />
            <div>{event._embedded.venues[0].address.line1}</div>
            <div className='flex justify-end'>{event._embedded.venues[0].city.name + ',' + event._embedded.venues[0].country.name}</div>
          </div>
        </div>
      </div>
      <br />
      <div className='font-bold text-lg'>Groups</div>
      <br />
      <div className='grid grid-cols-4 gap-4'>
          {
            [1,2,3,4].map((index) => (
              <GroupCard
                key={index}
                title={event.name}
                people={dummyPeople.slice(0, 4)}
              />
            ))
          }
        <div className='w-52 h-60 grid grid-rows-10 shadow-lg bg-white rounded-md p-2'>
          <div className='row-span-2'>People</div>

          <div className='row-span-6 grid grid-cols-3 grid-rows-3 gap-2 px-2'>
            {
              dummyPeople.map((person, index) => (
                <RoundedProfilePicture key={index} name={person.name} />
              ))
            }
          </div>
          <div className='text-sm row-span-2 flex items-end justify-center hover:underline'>
            <Link href={'/'}>
              <p>+45 more people</p>
            </Link>
          </div>

        </div>
      </div>
      <br />
      <div className='font-bold text-xl'>COMMENTS</div>
      <hr />
    </div>
  )
}

export default EventDetails
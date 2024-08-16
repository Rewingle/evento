
import getEvents from "@/actions/getConcerts";
import ConcertCard from "@/components/ui/concertCard";
import { Settings2 } from 'lucide-react';

import Link from "next/link";

export default async function Home() {

  const events = await getEvents()

  const categories: { name: string, url: string }[] = [
    {
      name: 'Concerts',
      url: '/concerts'
    },
    {
      name: 'Sports',
      url: '/sports'
    },
    {
      name: 'Theatre',
      url: '/theatre'
    },
    {
      name: 'Festivals',
      url: '/festivals'
    },
    {
      name: 'Comedy',
      url: '/comedy'
    },

  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-white">
      <div>EVENTO</div>
      <div className="flex justify-evenly items-center w-full overflow-x-scroll flex-nowrap">
        {categories.map((category, index) => (
          <Link href={'/categories' + category.url}>
            <div key={index} className="rounded-2xl shadow-lg bg-white flex justify-center items-center text-lg py-2 px-4"> {category.name}</div>
          </Link>
        ))}
        <div className="rounded-2xl shadow-lg bg-white flex justify-center items-center py-2 px-4 hover:cursor-pointer">
          <Settings2 /> <span className="ml-2 ">Filter</span>
        </div>
      </div>
   
       
      <br />

      <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">
            { events && events.map((event: any, index: any) => (
                    <ConcertCard key={index}
                        id={event.id}
                        title={event.name}
                        description={'concert.dates.start[0].toString()'}
                        imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
                        date={event.dates.start.localDate.toString()}
                        time={event.dates.start.localTime.toString()}
                    />
                ))}
        </div>

    </main>
  );
}

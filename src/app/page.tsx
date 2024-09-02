import getEvents from "@/actions/getConcerts";
import CreateGroup from "@/components/CreateGroup";
import ConcertCard from "@/components/ui/concertCard";
import { Settings2 } from 'lucide-react';

import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {

  const events = await getEvents()
  let genres: any = []

  events?.forEach(event => {
    try{
      const genre = event.classifications[0].genre.name;
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    }catch{
      return
    }
  });

  return (
    <Suspense fallback={<div className="font-bold text-2xl">LOADING</div>}>
      <main className="flex min-h-screen flex-col items-center">
        <CreateGroup/>
        <br />
        <div className="flex justify-evenly items-center w-full">
          {genres?.map((genre:string, index:number) => (
            <Link href={'/categories' + ' category.url'}>
              <div key={index} className="rounded-2xl shadow-lg bg-white flex justify-center items-center text-lg py-2 px-4"> {genre}</div>
            </Link>
          ))}
          <div className="rounded-2xl shadow-lg bg-white flex justify-center items-center py-2 px-4 hover:cursor-pointer">
            <Settings2 /> <span className="ml-2 ">Filter</span>
          </div>
        </div>
        <br />
        <br />
        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">

          {events && events.map((event: any, index: any) => (
            <ConcertCard key={index}
              id={event.id}
              title={event.name}
              description={'concert.dates.start[0].toString()'}
              imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
              date={event.dates.start.localDate?? ""}
              time={event.dates.start.localTime?? ""}
            />
          ))}

        </div>

      </main>
    </Suspense>
  );
}

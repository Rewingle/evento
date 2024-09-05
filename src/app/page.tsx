import getEvents from "@/actions/getConcerts";
import CreateGroup from "@/components/CreateGroup";
import ConcertCard from "@/components/ui/concertCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Settings2 } from 'lucide-react';

import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";

export default async function Home() {
  const user = await useCurrentUser()
  const events = await getEvents()
  let genres: any = []

  events?.forEach(event => {
    try {
      const genre = event.classifications[0].genre.name;
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    } catch {
      return
    }
  });

  return (

      <main className="flex min-h-screen flex-col items-center">
        <div className="size-full grid grid-cols-5 grid-rows-5 gap-4">

          <div className="col-span-2">{user ? <CreateGroup user={user} />:<MoonLoader/>}</div>
          <div className="col-span-3 grid grid-cols-3 grid-rows-3 gap-4">
          </div>

        </div>
        <div className="flex justify-evenly items-center w-full">
          {genres?.map((genre:string, index:number) => (
            <Link key={index} href={'/categories' + ' category.url'}>
              <div className="rounded-2xl shadow-lg bg-white flex justify-center items-center text-lg py-2 px-4"> {genre}</div>
            </Link>
          ))}
          <div className="rounded-2xl shadow-lg bg-white flex justify-center items-center py-2 px-4 hover:cursor-pointer">
            <Settings2 /> <span className="ml-2 ">Filter</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">

          {events && events.map((event: any, index: any) => (
            <ConcertCard key={index}
              id={event.id}
              title={event.name}
              description={'concert.dates.start[0].toString()'}
              imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
              date={event.dates.start.localDate ?? ""}
              time={event.dates.start.localTime ?? ""}
            />
          ))}

        </div>

      </main>
  );
}

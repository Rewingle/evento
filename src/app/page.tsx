
import getConcerts from "@/actions/getConcerts";
import ConcertCard from "@/components/ui/concertCard";

import { auth } from '@/auth'

export default async function Home() {

  const concerts = await getConcerts()

  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 py-12 md:p-0 lg:p-24 bg-white">
      <div>{session ? session?.user?.email : 'no session'}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">
        {concerts && concerts.map((concert: any, index: any) => (
          <ConcertCard key={index}
            title={concert.name}
            description={'concert.dates.start[0].toString()'}
            imageUrl={concert.images[0].url}
            date={concert.dates.start.localDate.toString()}
            time={concert.dates.start.localTime.toString()}
          />
        ))}
      </div>

    </main>
  );
}

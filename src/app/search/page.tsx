"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getQueryEvent from '@/actions/getQueryEvent'
import ConcertCard from '@/components/ui/concertCard'
import { IEvent } from '@/models/Event'

type Props = {}

function SearchResults({ }: Props) {
    const [events, setEvents] = useState<IEvent[]>([])
    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    useEffect(() => {
        if (query) {
            getQueryEvent(query,10).then((events: any) => {
                console.log(events)
                setEvents(events)
            })
        }
        setEvents([])
    }, [query])

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-green-300">
                {events ? events.map((event: IEvent, index: number) => (

                    <ConcertCard key={index}
                        id={ event.id}
                        title={event.name}
                        description={'concert.dates.start[0].toString()'}
                        imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
                        date={event.dates.start.localDate ? event.dates.start.localDate : ""}
                        time={event.dates.start.localTime ? event.dates.start.localTime : ""}
                    />

                )):<div className='text-center bg-red-200'>NO EVENTS FOUND</div>}
            </div>
        </div>
    )
}

export default SearchResults
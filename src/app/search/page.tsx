"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getQueryEvent from '@/actions/getQueryEvent'
import ConcertCard from '@/components/ui/concertCard'

type Props = {}

function SearchResults({ }: Props) {
    const [events, setEvents] = useState<any[]>([])
    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    useEffect(() => {
        if (query) {
            getQueryEvent(query).then((event: any) => {
                setEvents([event])
            })
        }
        setEvents([])
    }, [query])



    return (
        <div className='mt-32'>
            <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">
                {events && events.map((event: any, index: any) => (

                    <ConcertCard key={index}
                        title={event.name}
                        description={'concert.dates.start[0].toString()'}
                        imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
                        date={event.dates.start.localDate ? event.dates.start.localDate : ""}
                        time={event.dates.start.localTime ? event.dates.start.localTime : ""}
                    />

                ))}
            </div>
        </div>
    )
}

export default SearchResults
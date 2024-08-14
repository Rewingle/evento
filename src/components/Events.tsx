"use client"
import React from 'react'
import ConcertCard from './ui/concertCard'
import { useSearchStore } from '@/store'

type Props = {
    events: []
}

const Events = (props: Props) => {

    const searchedEvent = useSearchStore((state: any) => state.query)

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">
            { props.events && props.events.map((concert: any, index: any) => (

                    <ConcertCard key={index}
                        title={concert.name}
                        description={'concert.dates.start[0].toString()'}
                        imageUrl={'https://storage.googleapis.com/eventogether-general/TM_GenCatImgs_Generic_BW.jpg'}
                        date={concert.dates.start.localDate.toString()}
                        time={concert.dates.start.localTime.toString()}
                    />

                ))}
        </div>
    )
}

export default Events
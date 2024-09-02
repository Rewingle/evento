"use client"
import { Button } from '@/components/ui/button'
import { Earth } from 'lucide-react';
import { University } from 'lucide-react';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSpring, animated } from '@react-spring/web'
import React, { useCallback } from 'react'
import { getCitiesService, getCountriesService } from '@/services/location';
import { Input } from '@/components/ui/input';
import { getSearchEventsByLocation } from '@/services/eventService';
import { IEvent } from '@/models/Event';
import Image from 'next/image';
import { countries } from '@/lib/data/countries';
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type Props = {}
interface City {
    name: string
    lat: string
    lng: string
}
interface Country {
    id: number
    name: string
    iso2: string
}

function CreateGroup({ }: Props) {

    const [searchResults, setSearchResults] = React.useState<any | null>(null)
    const [search, setSearch] = React.useState<string>('')
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null)

    const [selectedCity, setSelectedCity] = React.useState<City | null>(null)
    const [cities, setCities] = React.useState<City[] | null>(null)

    const [selectedEvent, setSelectecEvent] = React.useState<{ id: string, name: string, image: string, location: string } | null>(null)
    const [isCityDisabled, setCityDisabled] = React.useState<boolean>(true)

    const [people, setPeople] = React.useState<number[]>([1])

    const [springsCountry, apiCountry] = useSpring(() => ({
        from: { width: 350 },
    }))
    const [springsInput, apiInput] = useSpring(() => ({
        from: { y: 0 },
    }))
    const [springsPeople, apiPeople] = useSpring(() => ({
        from: { y: 0, height: 0 },
    }))

    const handleCountry = async (country: any) => {
        const cities = await getCitiesService(country.name) as City[]
        setSelectedCountry(country)
        setCities(cities)
        apiCountry.start({
            from: {
                width: 350,
            },
            to: {
                width: 160,
            },
        })
        setCityDisabled(false)
    }
    const handleCity = (city: any) => {
        setSelectedCity(city)
        apiInput.start({
            from: {
                y: 0,
            },
            to: {
                y: 160,
            }
        })
    }
    const handleInputChange = async (e: any) => {
        setSearch(e.target.value)
        const searchResults = await getSearchEventsByLocation(e.target.value, { lat: selectedCity?.lat, lng: selectedCity?.lng })
        setSearchResults(searchResults)
    }
    const handleSelectEvent = (event: { id: string, name: string, image: string, location: string }) => {
        setSelectecEvent(event)
        setSearchResults(null)
        setSearch('')
        apiPeople.start({
            from: {
                y: 0,
                height: 0
            },
            to: {
                y: 150,
                height: 120
            }
        })
    }
    return (
        <div className='relative'>
            <div className='z-50 absolute w-96 h-44 rounded-xl shadow-xl border-2 
            border-black p-4 bg-gradient-to-t from-slate-950 to-slate-800 
            grid grid-rows-5 overflow-hidden'>
                <div className='items-center flex justify-start text-md font-bold text-white row-span-1'>
                    WHICH EVENT ARE YOU GOING TO ??
                </div>
                <div className='row-span-4 py-4 flex justify-evenly space-x-4 items-center' >
                    <animated.div style={{ ...springsCountry }}>
                        <Select /* disabled={isCountryDisabled} */ onValueChange={handleCountry}>
                            <SelectTrigger className="bg-transparent text-white">
                                <SelectValue placeholder={<span className='flex justify-evenly space-x-4 items-center'><Earth color='white' /> <p>Select a Country</p></span>} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {countries?.map((country: any, index) => (
                                        <SelectItem className='hover:cursor-pointer hover:font-bold' key={index} value={country}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </animated.div>
                    <div className='inline-block w-[160px]'>
                        <Select disabled={isCityDisabled} onValueChange={handleCity}>
                            <SelectTrigger className="bg-transparent text-white">
                                <SelectValue placeholder={<span className='flex justify-center space-x-2 items-center'><University color='white' size={22} /> <p>Select city</p> </span>} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cities</SelectLabel>
                                    {cities?.map((city: any, index) => (
                                        <SelectItem className='hover:cursor-pointer hover:font-bold' key={index} value={city}>
                                            {city.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    {selectedEvent &&
                        <div className='h-12 grid grid-cols-12 grid-rows-3 text-white'>
                            <div className='col-span-2 row-span-3 flex items-center justify-center'>
                                <Image src={selectedEvent.image} alt="event-pic" width={36} height={36} />
                            </div>
                            <div className='col-span-10 row-span-2 flex items-end justify-start text-sm w-full truncate'>
                                <p className='ml-4'>{selectedEvent.name}</p>
                            </div>
                            <div className='col-span-10 row-span-1 text-xs flex justify-end'>
                                <p>{selectedEvent.location}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <animated.div className='z-40 relative left-0 top-0 w-96 h-20 rounded-b-xl flex items-end shadow-xl
             px-4 py-4 bg-gradient-to-t from-slate-800 to-slate-600' style={{ ...springsInput }}>
                <div className='w-full'>
                    <Input onChange={handleInputChange} value={search} placeholder='Search Event' className='z-50 w-full' />
                    {searchResults &&
                        <div className='flex-col z-100 absolute bg-white rounded-xl 
                    rounded-t-none p-2 shadow-lg text-black z-50 w-[350px]'>
                            {searchResults?.map((event: IEvent, index: any) => (

                                <div onClick={() => handleSelectEvent({ id: event.id, name: event.name, image: event.images[0].url, location: event._embedded.venues[0].city.name + ' ' + event._embedded.venues[0].country.countryCode })} key={index} className='hover:bg-gray-300 hover:cursor-pointer flex space-x-2 text-center py-2'>
                                    <Image src={event.images[0].url} alt="event-pic" width={50} height={50} /> <p>{event.name}</p>
                                    <hr />
                                </div>

                            ))}
                        </div>}
                </div>
            </animated.div>
            <animated.div className='z-30 relative left-0 top-0 w-96 rounded-b-xl shadow-xl border-2 px-4 
            py-4 bg-gradient-to-t from-slate-700 to-slate-600 items-end' style={{ ...springsPeople }}>
                <div className='w-full text-white'>
                    How many people are you going with ?
                </div>
                <br />
                <div>
                    <Slider
                        defaultValue={[1]}
                        max={10}
                        step={0}
                        onValueChange={(value) => setPeople(value)}
                        className={cn("w-[60%]")}
                    />
                </div>
                {people[0]}
            </animated.div>
        </div>
    )
}

export default CreateGroup
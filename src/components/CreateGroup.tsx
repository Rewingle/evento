"use client"
import { Button } from '@/components/ui/button'
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
import React from 'react'
import { getCitiesService } from '@/services/location';
import { Input } from '@/components/ui/input';
import { getSearchEventsByLocation } from '@/services/eventService';
import { IEvent } from '@/models/Event';
import Image from 'next/image';
import { countries } from '@/lib/data/countries';
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { University, Earth } from 'lucide-react';
import OutsideClickHandler from 'react-outside-click-handler';
import PulseLoader from "react-spinners/PulseLoader";
import createGroupAction from '@/actions/groups/createGroupAction';
import { useRouter } from 'next/navigation';
import { Group } from '@prisma/client';

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

function CreateGroup({ user }: any) {
    const router = useRouter()

    const [searchResults, setSearchResults] = React.useState<any | null>(null)
    const [search, setSearch] = React.useState<string>('')
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null)
    const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false)
    const [createLoading, setCreateLoading] = React.useState<boolean>(false)
    const [groupName, setGroupName] = React.useState<string>('')
    const [selectedCity, setSelectedCity] = React.useState<City | null>(null)
    const [cities, setCities] = React.useState<City[] | null>(null)

    const [selectedEvent, setSelectedEvent] = React.useState<{ id: string, name: string, image: string, location: string, date: string } | null>(null)
    const [isCityDisabled, setCityDisabled] = React.useState<boolean>(true)

    const [people, setPeople] = React.useState<number>(1)

    const [springsCountry, apiCountry] = useSpring(() => ({
        from: { width: 350 },
    }))
    const [springsInput, apiInput] = useSpring(() => ({
        from: { y: 0 },
    }))
    const [springsPeople, apiPeople] = useSpring(() => ({
        from: { display: 'none', y: 0, height: 0 },
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
        setShowSearchResults(true)
        setSearch(e.target.value)
        const searchResults = await getSearchEventsByLocation(e.target.value, { lat: selectedCity?.lat, lng: selectedCity?.lng })
        setSearchResults(searchResults)
    }
    const handleSelectEvent = (event: { id: string, name: string, image: string, location: string, date: string }) => {
        setSelectedEvent(event)
        setSearchResults(null)
        setSearch('')
        apiPeople.start({
            from: {
                display: 'none',
                y: 0,
                height: 0
            },
            to: {
                display: 'block',
                y: 220,
                height: 200
            }
        })
    }

    const handleCreate = async () => {
        setCreateLoading(true)
        if (selectedEvent?.id && people && groupName) {
            createGroupAction({
                createdBy: user.id,
                eventId: selectedEvent.id,
                personLimit: people,
                groupName: groupName
            }).then((res: any) => {
                const group = res.data as Group
                if (group.id) {
                    router.push('/groups/id/' + group.id)
                } else {
                    alert('Something went wrong')
                }
                setCreateLoading(false)
            }).catch((e) => {
                console.log(e)
                alert(e)
            })
        }
        setCreateLoading(false)
    }
    return (
        <div className='grid grid-cols-1 relative'>

            {/* MAIN SLIDER */}
            <div className='row-span-1 col-span-1 w-96 h-44 rounded-xl z-50 shadow-xl border-2 
            border-black p-4 bg-gradient-to-t from-slate-950 to-slate-800 
            grid grid-rows-5 overflow-hidden'>
                <div className='items-center flex justify-start text-md font-bold text-white row-span-1'>
                    WHICH EVENT ARE YOU GOING TO ??
                </div>
                <div className='row-span-4 py-4 flex justify-evenly space-x-4 items-center' >
                    <animated.div style={{ ...springsCountry }}>
                        <Select disabled={!countries} onValueChange={handleCountry}>
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
                                <span><p>{selectedEvent.date}</p></span>
                                <span className='ml-2'><p>{selectedEvent.location}</p></span>
                            </div>
                        </div>

                    }
                </div>
            </div>

            {/* INPUT SLIDER */}
            <animated.div className='row-span-1 col-span-1 z-40 absolute left-0 top-0 w-96 h-20 rounded-b-xl flex items-end shadow-xl
             px-4 py-4 bg-gradient-to-t from-slate-800 to-slate-600 rounded-lg' style={{ ...springsInput }}>
                <div className='w-full'>
                    <Input onChange={handleInputChange} value={search} placeholder='Search Event' className='z-50 w-full' />
                    {searchResults &&
                        <OutsideClickHandler onOutsideClick={() => {
                            setSearchResults(null)
                        }}>
                            <div className={`flex-col z-100 absolute bg-white rounded-xl 
                            rounded-t-none p-2 shadow-lg text-black z-50 w-[350px]`}>
                                {showSearchResults && searchResults?.map((event: IEvent, index: any) => (

                                    <div onClick={() => handleSelectEvent({ id: event.id, name: event.name, image: event.images[0].url, location: event._embedded.venues[0].city.name + ' ' + event._embedded.venues[0].country.countryCode, date: event.dates.start.localDate })} key={index} className='hover:bg-gray-300 hover:cursor-pointer flex space-x-2 text-center py-2'>
                                        <Image src={event.images[0].url} alt="event-pic" width={50} height={50} /> <p>{event.name}</p>
                                        <hr />
                                    </div>

                                ))}
                            </div>
                        </OutsideClickHandler>
                    }
                </div>
            </animated.div>
            {/* PEOPLE SLIDER */}
            <animated.div className='row-span-1 col-span-1 z-30 absolute left-0 top-0 w-96 rounded-b-xl shadow-xl border-2 px-4 
             py-2 pt-8 bg-gradient-to-t from-slate-700 to-slate-600 items-end' style={{ ...springsPeople }}>
                <div className='w-full text-white'>
                    How many people are you going with ?
                </div>
                <br />
                <div className='flex'>
                    <Slider
                        defaultValue={[0]}
                        max={9}
                        step={1}
                        onValueChange={(value: any) => { let newValue = parseInt(value) as number + 1; setPeople(newValue) }}
                        className={cn("w-[65%]")}
                    />
                    <div className='text-center ml-4 text-white font-bold text-lg'>
                        {people == 10 ? <p>NO LIMIT</p> : <p>{people + ' person'}</p>}
                    </div>

                </div>
                <div className='py-2'>
                    <div className='text-white text-xs mb-2'>Group name:</div>
                    <div className='w-full grid grid-cols-6 gap-4'>
                        <div className='col-span-4'>
                            <div className='grid grid-flow-col w-full relative overflow-hidden'>
                                <Input onChange={(e) => setGroupName(e.target.value)} placeholder={`${user?.name}'s Group `} />
                            </div>
                        </div>
                        <Button className=' col-span-2 bg-gradient-to-t from-green-500 to-green-400 h-10' onClick={handleCreate}>{createLoading ? <PulseLoader color='#1e293b' /> : <p className='font-bold'>CREATE</p>}</Button>
                    </div>
                </div>
            </animated.div >
        </div >
    )
}

export default CreateGroup
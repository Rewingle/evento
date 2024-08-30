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
import { useSearchParams } from 'next/navigation';

type Props = {}
interface City {
    name: string
    lat: string
    lng: string
}
interface Country {
    name: string
    iso2: string
}


function CreateGroup({ }: Props) {

    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    
    const [searchResults, setSearchResults] = React.useState<any | null>(null)

    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null)
    const [countries, setCountries] = React.useState<Country[] | null>(null)

    const [selectedCity, setSelectedCity] = React.useState<City | null>(null)
    const [cities, setCities] = React.useState<City[] | null>(null)

    const [isCountryDisabled, setCountryDisabled] = React.useState<boolean>(true)
    const [isCityDisabled, setCityDisabled] = React.useState<boolean>(true)

    const [springsCountry, apiCountry] = useSpring(() => ({
        from: { width: 350 },
    }))
    const [springsInput, apiInput] = useSpring(() => ({
        from: { height: 170 },
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
                height: 170,
            },
            to: {
                height: 250,
            }
        })
    }
    const handleInputChange = async (e: any) => {
        const searchResults = await getSearchEventsByLocation(e.target.value, { lat: selectedCity?.lat, lng: selectedCity?.lng })
        setSearchResults(searchResults)
    }
    React.useEffect(() => {
        const getCountry = async () => {
            const countries = await getCountriesService() as Country[]

            setCountries(countries)
            setCountryDisabled(false)
        }
        getCountry()
    }, [])


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
                        <Select disabled={isCountryDisabled} onValueChange={handleCountry}>
                            <SelectTrigger className="bg-transparent text-white">
                                <SelectValue placeholder={<span className='flex justify-evenly space-x-4 items-center'><Earth color='white' /> {isCountryDisabled ? <p>Loading countries...</p> : <p>Select a Country</p>}</span>} />
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
                {/*      <div className='text-white'>{selectedCity?.lat + ' ' + selectedCity?.lng}</div> */}
            </div>
            <animated.div className='z-40 relative left-0 top-0 w-96 rounded-b-xl shadow-xl border-2 
             px-4 py-4 bg-gradient-to-t from-green-800 to-green-700 flex items-end' style={{ ...springsInput }}>
                <div className='w-full'>
                    <Input onChange={handleInputChange} placeholder='Search Event' className='z-50 w-full'></Input>
                    <div className='flex-col z-100 absolute bg-white rounded-xl 
                    rounded-t-none p-2 shadow-lg text-black z-50 w-[350px]'>
                        {searchResults?.map((event: IEvent, index: any) => (
                            <Link href={event.url?'/event/'+event.id:''}>
                                <div key={index} className='hover:bg-gray-300 hover:cursor-pointer flex space-x-2 text-center py-2'>
                                    <Image src={event.images[0].url} alt="event-pic" width={50} height={50} /> <p>{event.name}</p>
                                    <hr />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </animated.div>
        </div>
    )
}

export default CreateGroup
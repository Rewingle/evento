"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation } from "@/app/store/store";
import { getCookie, setCookie } from "cookies-next"
import { db } from '@/lib/db';
import { getCountriesService, getCitiesService } from "@/services/location";

interface City {
    name: string
    lat: string
    lng: string
}
interface Country {
    name: string
    iso2: string
}

function Location() {

    const [cities, setCities] = useState<City[] | null>(null)
    const [countries, setCountries] = useState<Country[] | null>(null)

    const [city, setCity] = useState<{ name: string, lat: string, lng: string } | null>(null)
    const [country, setCountry] = useState<{ name: string, iso2: string } | null>(null)

    const [selectedCountry, setSelectedCountry] = useState<any>(null)
    const [selectedCity, setSelectedCity] = useState<any>(null)

    const [isDisabled, setDisabled] = useState<boolean>(false)
    const [checkCookie, setCheckCookie] = useState<boolean>(false)

    const iso2FlagEmoji = (iso: any) => String.fromCodePoint(...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + 127397));
    /* useEffect(() => {
        console.log('use effect worked')
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAVKo7zeQuh5b0DDp78iLsMMrN6vSc3QBg&result_type=country`)
            .then((response) => {
                console.log(response.data.plus_code.compound_code.split(" ")[1])
                setLocation(response.data.plus_code.compound_code.split(" ")[1].slice(0,-1))
            }).catch((error) => {
                console.log(error)
                setLocation(null)  
            })

            
        });
    }, []) */

    //DISABLED FOR PRICING

    useEffect(() => {
        const getCountry = async () => {
            const countries = await getCountriesService() as Country[]
            console.log(countries)
            setCountries(countries)
        }
        getCountry()
    }, [])

    useEffect(() => {
        try {
            const countryCookie = JSON.parse(getCookie("country") as string)
            const cityCookie = JSON.parse(getCookie("city") as string)
            setCountry({ name: countryCookie.name, iso2: iso2FlagEmoji(countryCookie.iso2) })
            setCity({ name: cityCookie.name, lat: cityCookie.lat, lng: cityCookie.lng })
        } catch {
            return
        }
    }, [checkCookie])
    const getCities = async (country: string) => {
        setDisabled(true)
        if (selectedCountry === country) return
        console.log("GETTING IT")
        const cities = await getCitiesService(country) as City[]
        setCities(cities)
        setDisabled(false)
    }
    /*     const location = useLocation((state: any) => state)
        const setCountryStore = useLocation((state: any) => state.setCountry)
        const setCityStore = useLocation((state: any) => state.setCity) */

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className='hidden md:flex items-center justify-start w-52 border-2 border-gray-400 p-1 rounded-md'>

                        <MapPin />
                        {country && city ? city.name + ' ' + country.iso2 : <p>loading..</p>}

                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-64'>
                    <div className='space-y-4'>
                        <div>Change Address</div>

                        <Select onValueChange={(country: any) => { setCities([]); setSelectedCity(null); setSelectedCountry(country); getCities(country.name) }}>
                            <SelectTrigger className='h-8'>
                                <SelectValue placeholder={selectedCountry ? selectedCountry.name : 'Country'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {countries && countries.map((country: any, index: number) => {
                                        return <SelectItem className="hover:cursor" key={index} value={country}>{country.name} </SelectItem>;
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select disabled={isDisabled} onValueChange={(city: any) => { setSelectedCity(city) }}>
                            <SelectTrigger className='h-8'>
                                <SelectValue placeholder={selectedCity?.name ? selectedCity.name : 'City'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {cities && cities?.map((city: any, index: number) => {
                                        return <SelectItem className="hover:cursor" key={index} value={city}>{city.name}</SelectItem>;
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full justify-end flex"><Button className="bg-emerald-900"
                            onClick={() => {
                                setCookie("country", JSON.stringify({ name: selectedCountry.name, iso2: selectedCountry.iso2 }))
                                setCookie("city", JSON.stringify({ name: selectedCity.name, lat: selectedCity.lat, lng: selectedCity.lng }))
                                setCheckCookie(!checkCookie)
                            }}>SAVE</Button></div>
                    </div>

                </PopoverContent>
            </Popover>


        </>
    )


}

export default Location


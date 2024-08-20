"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
function Location() {
    const [cities, setCity] = useState<string[] | null>(null)
    const [countries, setCountries] = useState<string[] | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<any>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [isDisabled, setDisabled] = useState<boolean>(false)
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
            const { data: countries } = await axios.get(
                'https://countriesnow.space/api/v0.1/countries/flag/images'
            );
            console.log(countries)
            setCountries(countries.data)
        }
        getCountry()
    }, [])

    const getCities = async (country: string) => {
        setDisabled(true)
        console.log("GET CITIES")
        if (selectedCountry === country) return
        console.log("GETTING IT")
        const { data: cities } = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/cities',
            new URLSearchParams({
                'country': country.toLowerCase()
            })
        );
        setCity(cities.data)
        setDisabled(false)
    }
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className='hidden md:flex items-center justify-center'>
                        <MapPin /> {selectedCity + ' ' + selectedCountry?.iso2.toLowerCase()}
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-64'>
                    <div className='space-y-4'>
                        <div>Change Address</div>

                        <Select onValueChange={(country: any) => { setSelectedCountry(country); getCities(country.name) }}>
                            <SelectTrigger className='h-8'>
                                <SelectValue placeholder={selectedCountry ? selectedCountry.name : 'Country'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {countries && countries.map((country: any, index: number) => {
                                        return <SelectItem key={index} value={country}>{country.name + country.iso2} </SelectItem>;
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select disabled={isDisabled} onValueChange={(city: string) => setSelectedCity(city)}>
                            <SelectTrigger className='h-8'>
                                <SelectValue placeholder={selectedCity ? selectedCity : 'City'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {cities && cities?.map((city: string, index: number) => {
                                        return <SelectItem key={index} value={city}>{city}</SelectItem>;
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-full justify-end flex"><Button className="bg-emerald-900"
                        onClick={()=>{
                            
                        }}>SAVE</Button></div>
                    </div>

                </PopoverContent>
            </Popover>


        </>
    )


}

export default Location


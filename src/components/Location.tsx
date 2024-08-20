"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
function Location() {
    const [cities, setCity] = useState<string[] | null>(null)
    const [countries, setCountries] = useState<string[] | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string | null>()
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
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
   
    const getCities = async(country: string) => {
        if(selectedCountry === country) return
        const { data: cities } = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/cities',
            new URLSearchParams({
                'country': country.toLowerCase()
            })
        );
        setCity(cities.data)
    }
    return (
        <>

            <Select>
                <SelectTrigger className='h-8'>
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {countries && countries.map((country: any, index: number) => {
                            return <SelectItem key={index} value={country.name} onClick={() => getCities(country.name)}>{country.name}</SelectItem>;
                        })}

                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className='h-8'>
                    <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {cities && cities?.map((city: string, index: number) => {
                            return <SelectItem key={index} value={city} onClick={() => setSelectedCity(city)}>{city}</SelectItem>;
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )


}

export default Location


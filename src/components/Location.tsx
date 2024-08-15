"use client"

import { useEffect, useState } from "react";
import axios from "axios";
function Location() {
    const [location, setLocation] = useState<string | null>(null)
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
    return (
        <span>{'location'}</span>
    )


}

export default Location


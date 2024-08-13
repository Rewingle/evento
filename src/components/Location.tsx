"use client"

import { useEffect, useState } from "react";

function Location() {
    const [location, setLocation] = useState<{ lat: number, long: number } | null>(null)
    useEffect(() => {
        console.log('use effect worked')
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setLocation({ lat: position.coords.latitude, long: position.coords.longitude })
        });
    }, [])
    return (
        <span>{location?.lat + ' ' + location?.long}</span>
    )


}

export default Location


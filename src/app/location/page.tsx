"use client"
import React, { useEffect, useState } from 'react'
export default function Location({}: any) {

    const [isAllowed,setAllowed] = useState(false)
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });
        navigator.permissions && navigator.permissions.query({name: 'geolocation'})
        .then(function(PermissionStatus) {
            if (PermissionStatus.state == 'granted') {
                setAllowed(true)
                 /* alert('granted') */
            } else if (PermissionStatus.state == 'prompt') {
                /* alert('denipromped') */
            } else {
               /*  alert('denied') */
            }
        })
      },[])

  return (
    <div>
        LOCATION TEST
        <div>{isAllowed&& <div>You can see now</div>}</div>
    </div>
  )
}
"use server"
import axios from "axios"
import { ticketmasterApi } from "./api"
import { IEvent } from "@/models/Event"
import Geohash from 'latlon-geohash';
/* import ngeohash from 'ngeohash' */
import { cookies } from 'next/headers'
const PATH = '/discovery/v2'
const LOCALE = process.env.TICKETMASTER_LOCALE
const API_KEY = process.env.TICKETMASTER_API_KEY



export async function getAllEventsService(size: number) {


    try {
        const cookieStore = cookies()
        const city = cookieStore.get('city') as unknown as any
        const cityValue = JSON.parse(city.value)
        console.log('TAK')
        console.log(cityValue.lat)
        console.log(cityValue.lng)
        console.log(typeof (cityValue.lat))
        console.log(typeof (cityValue.lat))
        if (cityValue.lat && cityValue.lng) {
            console.log('LOCATION EXISTT')
            const lat = cityValue.lat
            const lng = cityValue.lng
            console.log(lat, lng)
            console.log(lat.replace(",", "."), lng.replace(",", "."))
            const res = await ticketmasterApi.get(`${PATH}/suggest?apikey=${API_KEY}&latlong=${lat.replace(",", ".") + ',' + lng.replace(",", ".")}`)
            console.log(`https://app.ticketmaster.com${PATH}/suggest?apikey=${API_KEY}&latlong=${lat.replace(",", ".") + ',' + lng.replace(",", ".")}`)
            console.log('EVENT COUNT '+res.data._embedded.events.length)
            return res.data._embedded.events as IEvent[]
        }
    }
    catch {
        const res = await ticketmasterApi.get(`${PATH}/suggest?apikey=${API_KEY}`)
        return res.data._embedded.events as IEvent[]
    }
}
export async function getEventDetailsService(id: string) {
    //PATH /discovery/v2/events/{id}
    const { data: data } = await ticketmasterApi.get<IEvent>(`${PATH}/events/${id}?apikey=${API_KEY}`)
    return data
}
export async function getQueryEventService(query: string, size: number) {

    const { data: data } = await ticketmasterApi.get(`${PATH}/events.json?size=${size}&apikey=${API_KEY}&keyword=${query}&locale=${LOCALE}`)
    const totalElemnts = data.page.totalElements
    if (totalElemnts === 0) {
        return null
    }
    const event = data._embedded.events
   
    return event as IEvent[]
}
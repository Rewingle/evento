"use server"

import { ticketmasterApi } from "./api"
import { IEvent } from "@/models/Event"
import { cookies } from 'next/headers'

const PATH = '/discovery/v2'
const LOCALE = process.env.TICKETMASTER_LOCALE
const API_KEY = process.env.TICKETMASTER_API_KEY

export async function getAllEventsService(size: number) {
    console.log(API_KEY)
    try {
        const cookieStore = cookies()
        const city = cookieStore.get('city') as unknown as any
        const cityValue = JSON.parse(city.value)

        if (cityValue.lat && cityValue.lng) {
            console.log('LOCATION EXISTT')
            const lat = cityValue.lat
            const lng = cityValue.lng
            console.log(lat, lng)
            console.log(lat.replace(",", "."), lng.replace(",", "."))
            const res = await ticketmasterApi.get(`${PATH}/suggest?apikey=${API_KEY}&latlong=${lat.replace(",", ".") + ',' + lng.replace(",", ".")}`)
            console.log(`https://app.ticketmaster.com${PATH}/suggest?apikey=${API_KEY}&latlong=${lat.replace(",", ".") + ',' + lng.replace(",", ".")}`)
            console.log('EVENT COUNT ' + res.data._embedded.events.length)
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
export async function getSearchEventsByLocation(query: string, location: { lat: string | undefined, lng: string | undefined }) {
    const size = 5
    const lat = location.lat
    const lng = location.lng
    if (!lat || !lng) { return null }
    console.log(query, lat, lng)
    try {
        const { data: data } = await ticketmasterApi.get(`${PATH}/events.json?size=${size}&apikey=${API_KEY}&keyword=${query}&latlong=${lat.replace(",", ".") + ',' + lng.replace(",", ".")}`)
        const event = data._embedded.events
        return event as IEvent[]

    } catch(e) {
        return {error:e}
    }

}
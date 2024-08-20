"use server"
import axios from "axios"
import { ticketmasterApi } from "./api"
import { IEvent } from "@/models/Event"
import Geohash from 'latlon-geohash';

const PATH = '/discovery/v2'
const LOCALE = process.env.TICKETMASTER_LOCALE
const API_KEY = process.env.TICKETMASTER_API_KEY

const loc = Geohash.encode(41.0247, 28.9252, 5);

export async function getAllEventsService(size: number) {
    console.dir(loc)
    const res = await ticketmasterApi.get(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${API_KEY}&geoPoint=${loc}`)
    return res.data._embedded.events as IEvent[]
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
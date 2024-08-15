"use server"
import axios from "axios"
import { ticketmasterApi } from "./api"
import { IEvent } from "@/models/Event"

const PATH = '/discovery/v2'
const LOCALE = process.env.TICKETMASTER_LOCALE
const API_KEY = process.env.TICKETMASTER_API_KEY

export async function getAllConcertsService() {
    const res = await ticketmasterApi.get(`${PATH}/events.json?countryCode=${LOCALE}&apikey=${API_KEY}`)
    return res.data._embedded.events as IEvent[]
}
export async function getEventDetailsService(id: string) {
    //PATH /discovery/v2/events/{id}
    const { data: data } = await ticketmasterApi.get<IEvent>(`${PATH}/events/${id}?apikey=${API_KEY}`)
    return data
}
export async function getQueryEventService(query: string) {
    const SIZE = 1
    const { data: data } = await ticketmasterApi.get(`${PATH}/events.json?size=${SIZE}&apikey=${API_KEY}&keyword=${query}&locale=${LOCALE}`)
    const event = data._embedded.events[0]
    if (!event) {
        console.log(event)
        return null
    }
    return event as IEvent
}
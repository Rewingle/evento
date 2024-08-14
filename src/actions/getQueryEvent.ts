"use server"
import axios from "axios"

export default async function getQueryEvent(query: string) {
    const API_KEY = process.env.TICKETMASTER_API_KEY
    const SIZE = 1
    const LOCALE = process.env.TICKETMASTER_LOCALE

    const {data: response} = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=${SIZE}&apikey=${API_KEY}&keyword=${query}&locale=${LOCALE}`)
    console.log('QUERY TEST')
    console.log(response._embedded.events[0])
    const event = response._embedded.events[0]
    if(!event){
        console.log(event)
        return null
    }
    return event
}
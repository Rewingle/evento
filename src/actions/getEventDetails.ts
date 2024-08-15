"use server"
import { getEventDetailsService } from "@/services/eventService"

export default async function getEventDetails(id:string) {
    return getEventDetailsService(id)
}
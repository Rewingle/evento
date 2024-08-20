"use server"
import { getQueryEventService } from "@/services/eventService"

export default async function getQueryEvent(query: string, size: number) {

    return getQueryEventService(query, size)
}
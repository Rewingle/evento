"use server"

import { getAllEventsService } from "@/services/eventService";

export default async function getEvents() {

    return getAllEventsService(10)

}
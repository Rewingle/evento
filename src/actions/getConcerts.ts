"use server"

import { getAllConcertsService } from "@/services/eventService";

export default async function getEvents() {

    return getAllConcertsService()

}
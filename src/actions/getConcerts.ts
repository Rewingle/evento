"use server"

import getAllConcerts from "@/services/event";

export default async function getEvents() {

    return getAllConcerts()

}
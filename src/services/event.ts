"use server"
import axios from "axios"

export default async function getAllConcerts() {
    const res = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=TR&apikey=QRRMCwuJTl5X04QUdcMf5F4GUC9xJ0qT")
    return res.data._embedded.events
}
"use server"
import { db } from '@/lib/db';


export async function getCountriesService() {
    return await db.countries.findMany({
        select: {
            name: true,
            iso2: true
        }
    })
}
export async function getCitiesService(country: string) {
    return await db.cities.findMany({
        where: {
            country: country
        },
        select: {
            name: true,
            lat: true,
            lng: true
        }
    })
}
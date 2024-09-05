"use server"
import { db } from "@/lib/db"
import { IEvent } from "@/models/Event"
import { ticketmasterApi } from "./api"
import { Group } from "@prisma/client"

interface GroupType {
    name: string,
    createdBy: string,
    eventId: string,
    personLimit: number,
    private: boolean,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    members: {
        connect: {
            id: string
        }
    }[]
}

export async function createGroupService(CreateGroupParams: GroupType) {
    try {
        const db_result = await db.group.create({
            data: {
                name: CreateGroupParams.name,
                createdBy: CreateGroupParams.createdBy,
                eventId: CreateGroupParams.eventId,
                personLimit: CreateGroupParams.personLimit,
                private: CreateGroupParams.private,
                description: CreateGroupParams.description,
                createdAt: CreateGroupParams.createdAt,
                updatedAt: CreateGroupParams.updatedAt,
                members: {
                    connect: {
                        id: CreateGroupParams.createdBy
                    }
                }
            }
        })
        return db_result
    } catch (error) {
        throw error
    }
}

export async function getGroupService(groupId: string) {
    const PATH = '/discovery/v2'
    const LOCALE = process.env.TICKETMASTER_LOCALE
    const API_KEY = process.env.TICKETMASTER_API_KEY
    
    try {
        let db_result = await db.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: true
            }
        }) as (Group & { event: IEvent }) | null
        if(db_result) {
            const { data: data } = await ticketmasterApi.get<IEvent>(`${PATH}/events/${db_result?.eventId}?apikey=${API_KEY}`)
            db_result["event"] = data;
            return db_result
        }else{
            return null
        }
        
    } catch (error) {
        return error
    }
}
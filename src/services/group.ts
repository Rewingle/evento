"use server"
import { db } from "@/lib/db"
import { CreateGroupParamsType } from "@/models/Group"
import type { Group } from "@prisma/client"

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
    return await db.group.create({
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
}
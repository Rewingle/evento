"use server"
import { db } from "@/lib/db"

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
    try {
        const db_result = await db.group.findUnique({
            where: {
                id: groupId
            }
        })
        return db_result
    } catch (error) {
        return error
    }
}
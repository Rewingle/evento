"use server"
import { CreateGroupParamsType } from "@/models/Group"
import { createGroupService } from "@/services/group"

export default async function createGroupAction(params: CreateGroupParamsType) {
    const {createdBy, eventId, personLimit, groupName} = params
    const values = {
        name: groupName,
        createdBy: createdBy,
        eventId: eventId,
        personLimit: personLimit == 10 ? 0 : personLimit,
        private: false,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [
            {
                connect: {
                    id: createdBy
                }
            }
        ]
    }
    createGroupService(values)
}
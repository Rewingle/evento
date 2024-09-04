"use server"
import apiResponse from "@/lib/apiResponse"
import { CreateGroupParamsType } from "@/models/Group"
import { createGroupService } from "@/services/group"

export default async function createGroupAction(params: CreateGroupParamsType) {
    const { createdBy, eventId, personLimit, groupName } = params
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
    console.log(values)
    const data = await createGroupService(values)
    if (!data) {
        return apiResponse(500, null)
    }
    return apiResponse(201, data, "Group created successfully")
}
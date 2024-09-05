"use server"
import apiResponse from "@/lib/apiResponse"
import { getGroupService } from "@/services/group"

export default async function getGroupAction(groupId: string):Promise<typeof apiResponse|any> {
    const data = await getGroupService(groupId)
    if (!data) {
        return apiResponse(404, null, "Group not found")
    }
    return apiResponse(200, data)
}
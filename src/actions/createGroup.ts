"use server"

interface CreateGroupParams {
    createdBy: string,
    eventId: string,
    personLimit: number | 'no_limit',
    groupName: string,

}

export default async function createGroup(CreateGroupParams:CreateGroupParams) {
    
}
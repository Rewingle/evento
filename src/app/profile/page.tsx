import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser';
type Props = {}

async function Profile({ }: Props) {
    const user = await useCurrentUser();
    return (
        <div className='flex justify-center items-center'>
            {user ? <>
                <div>{user.name}</div>
                <div>{user.email}</div>
            </> : null
            }
        </div>
    )
}

export default Profile
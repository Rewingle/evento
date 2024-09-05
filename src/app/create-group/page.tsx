import CreateGroup from '@/components/CreateGroup';
import { useCurrentUser } from '@/hooks/useCurrentUser';


async function CreateGroupPage() {
    const user = await useCurrentUser()
    console.log(user)
    return (
        <>
            {user ? <CreateGroup user={user} /> : null}
        </>
    )
}

export default CreateGroupPage
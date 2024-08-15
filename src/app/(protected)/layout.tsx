import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type Props = {}

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
       redirect('/login')
    }
    return <>{ children }</>
}

export default ProtectedLayout
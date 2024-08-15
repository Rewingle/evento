"use client"
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'
import { redirect } from 'next/navigation';

export function AuthGate({children}: {children: React.ReactNode}) {

    const user = useCurrentUser()

    if(!user){
        /* redirect('/login') */
        return (
            <div>You do not have permission to view this content!</div>
          );
    }
    return <>{children}</>
}
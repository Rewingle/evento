"use client"
import React, { useEffect, useState, useTransition } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertUser } from '@/services/userService'
import { CompleteProfileStepOne } from '@/schemas'
import { Textarea } from '@/components/ui/textarea'
import * as z from 'zod'

import { useCurrentUser } from '@/hooks/useCurrentUser'


type Props = {}

function CompleteYourProfile({ }: Props) {
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
    const [isStepOne, setIsStepOne] = useState(true)
  /*   useEffect(() => {
        async function getUser() {
            const user: any = await useCurrentUser()
            setUserName(user?.name)
        }
        getUser()
    }, []) */

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (values: z.infer<typeof CompleteProfileStepOne>) => {

        /*   startTransition(() => {
              insertUser(values).then((res: any) => {
                  if (res?.error) {
                      alert('error')
                  }
              }).catch((err) => {
                  alert(err)
              })
          }) */

    }
    return (

        <div className='w-96 px-4 md:px-0 flex justify-center items-center'>

            {isStepOne ? <div className='w-full'>
                <h1 className='text-sm flex mb-12 border-b-2 border-dotted py-4 border-black justify-between'><p>Complete your Profile</p> <p>1/2 Steps</p></h1>
                <div className='grid grid-cols-8 grid-rows-8 w-full h-44'>
                    <div className='flex justify-center items-start row-span-8 col-span-1 '>

                        <div className='relative flex justify-center items-center'>

                            <Input className='rounded-full bg-black size-20 hover:cursor-pointer' type='file' disabled={isPending} />

                            <div className='absolute flex justify-center items-center z-50 pointer-events-none'>
                                <Camera color='white' size={32} />
                            </div>
                        </div>

                    </div>
                    <div className='size-full  row-span-2 col-span-7 flex items-center text-2xl font-bold px-8'>{userName}</div>

                    <div className='size-full row-span-6 col-span-7 px-8 text-lg italic mt-4'>

                        <Textarea onChange={(e) => setBio(e.target.value)} className='h-24 resize-none' disabled={isPending} placeholder='Tell us a bit about yourself...' />

                    </div>
                </div>
                <br />
                <div className='flex w-full justify-end'>
                    <span>
                        <Button type="submit" className='w-24 text-white' onClick={() => setIsStepOne(false)}>
                            NEXT
                        </Button>
                    </span>
                </div>
            </div>
                :
                <div className='w-full'>
                    <h1 className='text-sm flex mb-12 border-b-2 border-dotted py-4 border-black justify-between'><p>Complete your Profile</p> <p>2/2 Steps</p></h1>

                    <br />
                    <div className='flex w-full justify-between'>
                        <span>
                            <Button type="submit" className='w-24 text-black bg-transparent border-2 border-black hover:text-white' onClick={() => setIsStepOne(true)}>
                                {'<BACK'}
                            </Button>
                        </span>
                        <span>
                            <Button type="submit" className='w-24 text-white px-2' onClick={() => handleSubmit(
                                {
                                    profilePictureUrl: "testurl.com",
                                    bio: bio
                                }
                            )}>
                                COMPLETE
                            </Button>
                        </span>
                    </div>
                </div>


            }
        </div >
    )
}

export default CompleteYourProfile
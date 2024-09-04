"use client"
import getGroupAction from '@/actions/groups/getGroupAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Group } from '@prisma/client'
import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { SendHorizontal } from 'lucide-react';
import { MessageBubbleReceived, MessageBubbleSend } from '@/components/MessageBubble'
import { useCurrentUser } from '@/hooks/useCurrentUser'
function GroupPage({ params }: { params: { id: string } }) {

  const [groupData, setGroupData] = useState<Group | null>(null)
  const [messages, setMessages] = useState<string[] | []>([])
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const getGroup = async () => {
      const response = await getGroupAction(params.id)
      const user = await useCurrentUser()
      setUser(user)
      if (response.statusCode !== 200) {
        return (
          <div>Group not found</div>
        )
      }
      setGroupData(response.data)
    }
    getGroup()
  }, [])
  function sendMessage(formData: FormData) {
    const message = formData.get("message");

    setMessages((prevMessages: any) => [...prevMessages, message]);
  }

  return (
    <div className='w-full h-full'>
      {groupData && user ? <>
        <div className='w-full h-full grid md:grid-cols-10 grid-rows-10 gap-4'>
          <div className='hidden md:grid col-span-3 row-span-10 gap-4'>
            <div className='row-span-1'>
              <div className='shadow-2xl rounded-tl-lg bg-gradient-to-t from-slate-950 to-slate-800 size-full text-white'>
                <div className='text-center'>EVENT DETAILS</div>
              </div>
            </div>
            <div className='row-span-1 shadow-lg rounded-lg size-full '>
            </div>
          </div>
          <div className='grid grid-rows-12 row-span-10 col-span-7'>
            <div className='row-span-1 grid grid-cols-5  rounded-tr-lg items-center bg-gradient-to-r from-slate-950 from-70% to-slate-900 via-30% text-white'>
              <div className='col-span-3 px-8 font-bold text-xl'>{groupData.name}</div>
              <div className='col-span-2 rounded-tr-lg size-full text-white flex items-center justify-center'>
                <p>12 online</p>
              </div>
            </div>
            <div className='row-span-11 grid grid-rows-10'>
              <div className='row-span-9 space-y-4 py-4 bg-gray-100 overflow-y-scroll'>
                {
                  messages?.map((message, index) => (
                    <div className='flex justify-end'>
                      <MessageBubbleSend key={index} message={message} user={user.name} />
                    </div>
                  ))
                }
              </div>
              <form action={sendMessage}>
                <div className='row-span-1 grid grid-cols-6 bg-white shadow-xl rounded-xl size-full px-4 items-center'>
                  <div className='col-span-5'>
                    <Input name='message' id='message' className='w-full text-lg' />
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Button className='rounded-3xl w-16 h-12' type='submit'><SendHorizontal /></Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </> : <MoonLoader />
      }
    </div>
  )
}

export default GroupPage
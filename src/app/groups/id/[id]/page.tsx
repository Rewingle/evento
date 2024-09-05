"use client"
import getGroupAction from '@/actions/groups/getGroupAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
/* import type { Group } from '@prisma/client' */
import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { SendHorizontal } from 'lucide-react';
import { MessageBubbleReceived, MessageBubbleSend } from '@/components/MessageBubble'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { MessageSquare } from 'lucide-react';
import { IEvent } from '@/models/Event'
import { Clock } from 'lucide-react'

function GroupPage({ params }: { params: { id: string } }) {
  const [groupData, setGroupData] = useState<any & { members: any[], event: IEvent } | null>(null)
  const [messages, setMessages] = useState<string[] | []>([])
  const [message, setMessage] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  setUser(useCurrentUser())
  useEffect(() => {
    const getGroup = async () => {
      const response = await getGroupAction(params.id)

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

    setMessage("");
    setMessages((prevMessages: any) => [...prevMessages, message]);
  }

  return (
    <div className='w-full h-full'>
      {groupData && user ? <>
        <div className='w-full h-full grid md:grid-cols-10 grid-rows-10 gap-4'>
          <div className='hidden md:grid col-span-3 row-span-10 gap-4 grid-rows-4'>

            <div className='p-4 row-span-2 grid grid-rows-10 shadow-2xl rounded-tl-lg bg-gradient-to-t from-slate-950 to-slate-800 size-full text-white text-center'>
              <div className='row-span-2'>
                <div className='font-bold text-xl '>{groupData.event.name}</div>
                <div className=''>{groupData.event._embedded.venues[0].name}</div>
              </div>
              <div className='w-full row-span-4 bg-gray-400'></div>
              <div className='row-span-2 px-6 flex justify-between items-center text-xl'>
                <div>
                  <div className='space-x-2 flex text-white'><Clock color='white' /><p>{groupData.event.dates.start.localTime.slice(0, 5)}</p></div>
                </div>
                <div>
                  <div className='text-white'>{groupData.event.dates.start.localDate}</div>
                </div>
              </div>
              <div className='row-span-2 flex justify-end'>
                <Button className='bg-slate-600'>BUY TICKET</Button>
              </div>
            </div>

            <div className='row-span-3 shadow-lg rounded-lg size-full py-4'>
              {groupData.members.map((member: any, index: number) => (
                <div key={index} className='px-2 grid grid-cols-10 py-1 shadow-sm'>
                  <div className='col-span-2 hover:cursor-pointer'>
                    <div className='rounded-full bg-red-400 h-8 w-8'></div>
                  </div>
                  <div className='col-span-5 hover:underline hover:cursor-pointer flex items-center'>{member.name}</div>
                  <div className='col-span-3 flex justify-end items-center'><MessageSquare className='text-gray-500 hover:text-black hover:cursor-pointer' /></div>
                </div>
              ))}
            </div>

          </div>
          <div className='grid grid-rows-12 row-span-10 col-span-7'>
            <div className='row-span-1 grid grid-cols-5  rounded-tr-lg items-center bg-gradient-to-l from-slate-950 to-slate-800 text-white'>
              <div className='col-span-3 px-8 font-bold text-xl'>{groupData.name}</div>
              <div className='col-span-2 rounded-tr-lg size-full text-white flex items-center justify-center'>
                <p>12 online</p>
              </div>
            </div>  
            <div className='row-span-11 grid grid-rows-10'>
              <div className='row-span-9 space-y-4 py-4 bg-gray-100 overflow-y-scroll'>
                {
                  messages?.map((message, index) => (
                    <div key={index} className='flex justify-end'>
                      <MessageBubbleSend key={index} message={message} user={user.name} />
                    </div>
                  ))
                }
              </div>
              <form action={sendMessage}>
                <div className='row-span-1 grid grid-cols-6 bg-white shadow-xl rounded-xl size-full px-4 items-center'>
                  <div className='col-span-5'>
                    <Input onChange={(e) => setMessage(e.target.value)} name='message' value={message} id='message' className='w-full text-lg' />
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
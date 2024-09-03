"use client"
import getGroupAction from '@/actions/groups/getGroupAction'
import { Group } from '@prisma/client'
import { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

function GroupPage({ params }: { params: { id: string } }) {

  const [groupData, setGroupData] = useState<any>(null)

  useEffect(() => {
    const getGroup = async () => {
      const response = await getGroupAction(params.id)
      console.log(response)
      if (response.statusCode !== 200) {
        return (
          <div>Group not found</div>
        )
      }
      setGroupData(response.data)
    }
    getGroup()
  }, [])

  return (
    <div className='w-full h-full'>
      {groupData ? <>
        <div className='w-full h-full grid grid-cols-10 grid-rows-10'>
          <div className='col-span-3 row-span-10'>
            <div className='row-span-1 bg-red-400'></div>
            <div className='row-span-1 bg-green-400'></div>
          </div>
          <div className='row-span-10 col-span-7 bg-blue-500'></div>
        </div>
      </> : <MoonLoader></MoonLoader>
      }
    </div>
  )
}

export default GroupPage
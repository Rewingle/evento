import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

export const MessageBubbleReceived = (props: { message: string }) => {
    return (
        <div className=' flex space-x-2'>
            <div className='col-span-2 row-span-3'>
                <div className='rounded-full bg-red-300 h-12 w-12'></div>
            </div>
            <div className='space-y-1'>
                <div className='text-xs'>
                    <p>Name</p>
                </div>
                <div className='max-w-60 break-words max-h-72 bg-indigo-600 text-white rounded-b-lg rounded-tr-lg py-2 px-4 '>

                    {props.message}
                </div>
            </div>
        </div>
    )
}
export const MessageBubbleSend = (props: { message: string, user: any }) => {
    const [loading, setLoading] = React.useState(true)
    const currentTime = new Date().toLocaleTimeString().slice(0, 5)
    setTimeout(() => {
        setLoading(false)
    }, 3000);
    return (
        <div className=' flex space-x-2'>
            <div className='space-y-1'>
                <div className='text-xs flex justify-end'>
                    <p>{props.user.name}</p>
                </div>
                <div className='max-w-60 break-words max-h-72 bg-indigo-600 text-white rounded-b-lg rounded-tl-lg py-2 px-4 '>
                    <p className='text-center'>{props.message}</p>
                    <div className='h-2 text-xs flex justify-between space-x-2 py-2 items-center opacity-60'>
                        <div>{currentTime}</div>
                        {loading && <PulseLoader size={4} color='white' />}
             
                    </div>
                </div>
            </div>
            <div className='col-span-2 row-span-3'>
                <div className='rounded-full bg-red-300 h-12 w-12'></div>
            </div>
        </div>
    )

}
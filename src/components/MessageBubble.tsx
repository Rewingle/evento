import React from 'react'

type Props = {
    message: string
}

const MessageBubble = (props: Props) => {
    return (
        <div className=' flex space-x-2'>
            <div className='col-span-2 row-span-3'>
                <div className='rounded-full bg-red-300 h-12 w-12'></div>
            </div>
            <div className='space-y-2'>
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

export default MessageBubble
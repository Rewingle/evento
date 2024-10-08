import React from 'react'

type Props = {
    name: string
}

function RoundedProfilePicture({children}:any) {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className={`shadow-md rounded-full w-10 h-10 flex justify-center items-center text-sm font-bold ${randomColor}`}>{children}</div>
    )
}

export default RoundedProfilePicture
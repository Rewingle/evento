import Image from "next/image";
import { CalendarPlus } from 'lucide-react';
const isToday = (date: string): boolean => {
    const today = new Date();
    const eventDate = new Date(date);
    return (
        today.getFullYear() === eventDate.getFullYear() &&
        today.getMonth() === eventDate.getMonth() &&
        today.getDate() === eventDate.getDate()
    );
};
const isTomorrow = (date: string): boolean => {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const eventDate = new Date(date);
    return (
        tomorrow.getFullYear() === eventDate.getFullYear() &&
        tomorrow.getMonth() === eventDate.getMonth() &&
        tomorrow.getDate() === eventDate.getDate()
    );
};

export default function ConcertCard(props: { title: string, description: string, imageUrl: string, date: string, time: string }) {
    const time = props.time.toString().slice(0, -3)
    const people = [
        {
            name: 'John',
            color: 'purple'
        },
        {
            name: 'Mane',
            color: 'blue'
        },

    ]
    return (
        <div className='w-52 h-64 grid grid-rows-12 text-black shadow-md bg-gray-50 transition hover:bg-slate-100'>
            <div className='row-span-5 h-full w-full relative'>
                <Image alt="event-cover" fill style={{ objectFit: "contain" }} src={props.imageUrl} />
            </div>
            <div className='row-span-3 break-words h-full line-clamp-2 text-sm font-bold p-2'>
                {props.title}
            </div>
            <div className=" row-span-4 text-sm p-2">

                {isToday(props.date) ?
                    <div className="flex justify-between">
                        <span>Today</span>
                        <span>{time}</span>
                    </div>
                    : isTomorrow(props.date) ?
                        <div className="flex justify-between">
                            <span>Tomorrow</span>
                            <span>{time}</span>
                        </div>
                        :
                        <div className="flex justify-between">
                            <span>{props.date}</span>
                            <span>{time}</span>
                        </div>
                }
                <br />
                <div className="w-full grid grid-cols-12 h-full text-black opacity-75">
                    <div className="col-span-1">
                        <CalendarPlus />
                    </div>
                    <div className="flex justify-end col-span-8 size-full">
                        <div className="relative z-0 w-12">
                            <div className={`rounded-full bg-purple-500 w-8 h-8 flex justify-center items-center text-sm font-bold `}>{people[0].name[0]}</div>

                            <div className={`rounded-full bg-green-500 absolute inset-y-0 left-4 z-10 w-8 h-8 flex justify-center items-center text-sm font-bold`}>{people[1].name[0]}</div>

                        </div>
                    </div>
                    <div className="col-span-3 text-center flex h-8 items-center justify-center font-bold">+{Math.floor(Math.random() * 500) + 1}</div>

                </div>

            </div>
        </div>
    )

}
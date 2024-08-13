import CardImage from "../CardImage";
import Image from "next/image";
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

    return (
        <div className='w-52 h-52 grid grid-rows-8 text-black shadow-md bg-gray-50 '>
            <div className='row-span-6 rounded-t-sm'>
                {/* <CardImage imageUrl={props.imageUrl}/> */}
                <Image alt="event-cover" width={208} height={156} src={props.imageUrl}/>
            </div>
            <div className='row-span-1'>
                <div className='w-52 font-bold px-2 truncate '>{props.title}</div>
            </div>
            <div className="px-2 row-span-1">
                <div>
                    {
                        isToday(props.date) ? ('Today   ' + time) : isTomorrow(props.date) ? ('Tomorrow  ' + time) : props.date
                    }
                </div>

            </div>
        </div>
    )
}
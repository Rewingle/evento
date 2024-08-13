import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { auth, signOut } from '@/auth'
import Location from '@/components/Location'

type Props = {}

async function Navbar({ }: Props) {
    const logoSvg = <svg id="logo-81" width="72" height="40" viewBox="0 0 72 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="ccustom" d="M71.9944 14.2262C72.0019 14.1706 72.0019 14.1144 71.9944 14.0588V14.0588C72.0015 14.0135 72.0015 13.9673 71.9944 13.9219L71.461 10.0117C71.3841 9.54389 71.1783 9.10665 70.8668 8.74888L70.7753 8.64237L70.6078 8.475L61.374 0.5329L61.633 0.791571C61.4211 0.538393 61.1551 0.335885 60.8545 0.198963C60.5539 0.0620404 60.2263 -0.0058167 59.896 0.000397417H57.0923C56.6364 -0.00862213 56.1909 0.136114 55.8276 0.411202C55.4461 0.137771 54.9868 -0.00622479 54.5172 0.000397417H51.7135C51.3458 -0.00555964 50.9831 0.0855647 50.662 0.264571C50.3409 0.443577 50.0729 0.704109 49.8851 1.01978C49.5955 1.47065 49.4867 2.01388 49.5803 2.54126L49.9308 5.00604C49.6986 4.87462 49.4358 4.80643 49.1689 4.80827H35.5925C35.1054 4.81132 34.6295 4.95388 34.2211 5.21905C33.8262 5.46587 33.5092 5.81929 33.3069 6.23843L32.2555 5.34077C31.8417 4.95846 31.2955 4.75124 30.7318 4.76262H9.43008C8.94125 4.77151 8.46328 4.90787 8.04353 5.1582C7.46927 5.49382 7.04842 6.03953 6.87023 6.67967L0.10488 29.2736C-0.0215282 29.6459 -0.0339633 30.0474 0.0691674 30.4268C0.172298 30.8061 0.386324 31.1463 0.683903 31.4037C0.761443 31.4693 0.84286 31.5303 0.927705 31.5862C0.927705 31.5862 0.790548 31.4949 0.714361 31.4189L9.94819 39.3762C10.3388 39.7353 10.8495 39.936 11.3804 39.9391H32.8498C33.3401 39.9264 33.8184 39.7847 34.2364 39.5283C34.4728 39.3993 34.6843 39.2293 34.8611 39.0262L34.9373 38.9197L35.0592 38.7676L35.1506 38.6002L36.1563 39.4675C36.5413 39.8123 37.0409 40.002 37.5581 40H59.0731C59.5629 39.9837 60.0403 39.8423 60.4597 39.5892C60.6908 39.4523 60.9011 39.2832 61.0845 39.0871L61.1606 38.9806L61.2825 38.8285C61.3473 38.7322 61.4035 38.6304 61.4501 38.5241C61.4999 38.4319 61.5407 38.3351 61.572 38.2351V38.2351L67.7431 17.6039V17.4213C67.7507 17.3505 67.7507 17.2791 67.7431 17.2083V17.0714C67.7505 17.026 67.7505 16.9798 67.7431 16.9344C67.75 16.8382 67.75 16.7416 67.7431 16.6453H69.724C69.8963 16.6611 70.0697 16.6611 70.242 16.6453H70.3792C70.4907 16.6121 70.5981 16.5661 70.6992 16.5084H70.8516L71.1258 16.2954L71.2477 16.2041L71.461 15.9302V15.839L71.6134 15.5803C71.6049 15.53 71.6049 15.4785 71.6134 15.4282C71.6053 15.4035 71.6053 15.3768 71.6134 15.3521C71.6134 15.3521 71.6134 15.3521 71.6134 15.3521C71.6458 15.2629 71.6713 15.1713 71.6896 15.0782V15.0782C71.6825 15.0482 71.6825 15.0169 71.6896 14.9869C71.6822 14.9416 71.6822 14.8953 71.6896 14.85C71.6896 14.85 71.9944 14.2566 71.9944 14.2262Z" fill="black"></path><path d="M31.3565 6.49713C31.4374 6.57017 31.4939 6.66621 31.5184 6.77231C31.543 6.87841 31.5343 6.98946 31.4937 7.0905L24.7436 29.6692C24.6586 29.9157 24.4847 30.1218 24.256 30.2474C24.0699 30.3717 23.8545 30.4451 23.6312 30.4604H2.17717C1.99395 30.4516 1.82037 30.3758 1.68957 30.2474C1.61176 30.1755 1.55715 30.0821 1.53272 29.9792C1.50829 29.8762 1.51517 29.7683 1.55244 29.6692L8.31779 7.0905C8.39574 6.84088 8.56417 6.62928 8.79014 6.49713C8.97931 6.38175 9.19368 6.31388 9.41487 6.29933H30.8689C31.0507 6.30108 31.225 6.3718 31.3565 6.49713V6.49713ZM20.1571 25.12L24.195 11.6397H12.889L8.86631 25.12H20.1571M51.8354 6.72534C51.9086 6.81028 52.0001 6.87764 52.103 6.92242C52.2059 6.9672 52.3175 6.98825 52.4297 6.98399H55.2181C55.3243 6.98503 55.4289 6.95903 55.5223 6.90845C55.6156 6.85787 55.6944 6.78437 55.7514 6.69491C55.8009 6.62503 55.8359 6.54592 55.8542 6.46228C55.8725 6.37865 55.8738 6.2922 55.858 6.20805L55.3095 2.19135C55.2573 2.00545 55.1635 1.83379 55.0353 1.68926C54.962 1.60432 54.8706 1.53696 54.7677 1.49218C54.6648 1.4474 54.5531 1.42636 54.441 1.43061H51.6526C51.5464 1.42958 51.4417 1.45558 51.3484 1.50616C51.2551 1.55674 51.1762 1.63023 51.1193 1.7197C51.0126 1.9327 50.9669 2.06963 51.0126 2.19135L51.5764 6.20805C51.6053 6.40363 51.6961 6.58486 51.8354 6.72534V6.72534ZM60.6883 2.16092C60.636 1.97501 60.5422 1.80335 60.414 1.65883C60.3439 1.5742 60.2551 1.50686 60.1547 1.462C60.0543 1.41715 59.9449 1.39599 59.835 1.40018H57.0313C56.9269 1.39721 56.8236 1.42251 56.7324 1.4734C56.6412 1.52429 56.5655 1.59889 56.5133 1.68926C56.4119 1.82424 56.368 1.99379 56.3914 2.16092L56.9551 6.17761C56.9905 6.37113 57.0803 6.55057 57.2142 6.69491C57.2887 6.77819 57.3804 6.84442 57.483 6.88906C57.5856 6.9337 57.6965 6.9557 57.8084 6.95355H60.6121C60.7163 6.95493 60.8189 6.92896 60.9098 6.87822C61.0008 6.82748 61.0768 6.75379 61.1302 6.66449C61.1832 6.59642 61.2202 6.51734 61.2387 6.4331C61.2572 6.34886 61.2565 6.26157 61.2368 6.17761L60.6883 2.16092ZM49.3822 8.24682L49.1079 6.2689H35.5925C35.3803 6.28058 35.175 6.34889 34.9982 6.46669C34.886 6.5278 34.7883 6.6125 34.712 6.71494C34.6358 6.81739 34.5827 6.93513 34.5564 7.06007L33.4288 10.8333C33.3838 10.9276 33.3684 11.0334 33.3847 11.1366C33.4011 11.2398 33.4483 11.3356 33.5202 11.4115C33.6487 11.5321 33.8164 11.6024 33.9926 11.6093H50.4184L46.3805 25.0896H30.0004C29.7892 25.0944 29.5835 25.1576 29.4062 25.2721C29.1907 25.4088 29.0333 25.6201 28.9643 25.8655L27.8215 29.6388C27.7842 29.7356 27.7744 29.8408 27.7932 29.9428C27.8121 30.0449 27.8587 30.1397 27.9281 30.2169C28.0526 30.3456 28.2216 30.4218 28.4005 30.4299H49.9155C50.138 30.4108 50.3525 30.3377 50.5402 30.2169C50.7652 30.0907 50.934 29.8842 51.0126 29.6388L57.1989 9.00756H50.2355C50.125 9.00973 50.0153 8.98925 49.9131 8.94738C49.8109 8.90551 49.7184 8.84312 49.6413 8.76411C49.5153 8.62614 49.4262 8.4587 49.3822 8.27725V8.24682Z" fill="white"></path></svg>

    const session = await auth();
    /*     const location = Location() */
    return (
        <div className='w-full h-16 fixed bg-white shadow-lg z-50'>
            <div className='grid grid-cols-3 px-24'>
                <div className=' w-full flex items-center justify-center'>
                    <span>📍</span>
                    <span><Location></Location> </span>
                </div>
                <Link href={'/'}>
                    <div className='p-4 flex items-center justify-center h-full'>
                        {logoSvg}
                    </div>
                </Link>

                <div className='h-full flex justify-center items-center '>
                    {session ?
                        <div className='flex space-x-8'>
                            <div className='flex items-center font-bold'>{session ? session?.user?.name : 'no session'}</div>
                            <div>
                                <Link href={'/profile'}>
                                    <Button>Profile</Button>
                                </Link>
                            </div>
                            <div>
                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <Button type='submit'>Logout</Button>
                                </form>
                            </div>

                        </div>
                        :
                        <div className='space-x-8'>

                            <Link href={'/register'}>
                                <Button>
                                    Register
                                </Button>
                            </Link>
                            <Link href={'/login'}>
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        </div>}
                </div>

            </div>
        </div>
    )
}

export default Navbar
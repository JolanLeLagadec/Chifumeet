import logo from '@/public/logo.png'
import bell from '@/public/bell.svg'
import Image from 'next/image'
import HamburgerMenu from '../HamburgerMenu'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ModeToggle } from '../ui/toggle-dark'
import { fetchUserNotifs } from '@/app/notifications/fetchUserNotifs'

export default async function Navbar() {
    
    const user = await useCurrentUser()
    const notifs = user ? await fetchUserNotifs(user.id) : null

    const notifsCount = notifs ? notifs.length : null
    console.log('ici compte', notifsCount)
    console.log(notifs)
    console.log(user)


    return (
        <nav className='bg-background'>
            <div className="flex flex-row justify-between py-4 px-6 ">
                <Link href="/">
                    <Image
                        className='rounded-[15rem] cursor-pointer'
                        priority
                        src={logo}
                        width={80}
                        height={200}
                        alt="logo"
                    />
                </Link>
                <div className='flex flex-row gap-8 items-center'>
                    {
                        !user && (
                            <ModeToggle />
                        )
                    }
                    {
                        user && (
                            <div className='rounded-full w-12 h-12 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex justify-center items-center relative'>
                                <Link href="/notifications">
                                <div className='absolute top-0 right-0 text-xl text-teal-500'>{notifsCount}</div>
                                <Image
                                    className='cursor-pointer dark:invert '
                                    src={bell}
                                    width={40}
                                    height={150}
                                    alt="hamb"
                                />
                                </Link>
                            </div>
                        )
                    }
                    <div className='rounded-full w-12 h-12 hover:bg-slate-700 transition flex justify-center items-center'>
                        <HamburgerMenu user={user} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

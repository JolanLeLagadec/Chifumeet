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
                                    {
                                        notifsCount !== 0 && (
                                            <div className='absolute top-0 right-0 text-xl dark:bg-slate-100 bg-slate-300 rounded-full w-6 h-6 flex justify-center items-center'>
                                                <span className='dark:text-slate-800'>{notifsCount}</span>
                                            </div>
                                        )
                                    }
                                    <Image
                                        className='cursor-pointer dark:invert '
                                        src={bell}
                                        width={40}
                                        height={150}
                                        alt="bell"
                                    />
                                </Link>
                            </div>
                        )
                    }
                    <div className='rounded-full w-12 h-12 dark:hover:bg-slate-700 hover:bg-slate-200  transition flex justify-center items-center'>
                        <HamburgerMenu user={user} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

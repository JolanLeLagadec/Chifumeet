import logo from '@/public/logo.png'
import bell from '@/public/bell.svg'
import Image from 'next/image'
import HamburgerMenu from '../HamburgerMenu'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ModeToggle } from '../ui/toggle-dark'
import { fetchUserNotifs } from '@/app/notifications/_actions/fetchUserNotifs'

export default async function Navbar() {

    const user = await useCurrentUser()
    const notifs = user ? await fetchUserNotifs(user.id) : null

    const readedCount = notifs?.filter(notif => notif.readed === false)
    const notifsCount = readedCount?.length

    return (
        <nav className='bg-background'>
            <div className="flex flex-row justify-between py-4 px-6  items-center">
                <Link href="/">
                    <h1 className='text-neutral-600 uppercase tracking-tight dark:text-white'>chifumeet</h1>
                </Link>
                <div className='flex flex-row gap-8 items-center'>
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

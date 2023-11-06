import logo from '@/public/logo.png'
import bell from '@/public/bell.svg'
import Image from 'next/image'
import HamburgerMenu from './HamburgerMenu'
import { Button } from './ui/button'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { ModeToggle } from './ui/toggle-dark'

export default async function Navbar() {
    const user = await useCurrentUser()
    console.log(user)


    return (
        <nav className='bg-background'>
            <div className="flex flex-row justify-between py-4 px-6 ">
                <h1>{user?.name}</h1>
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
                    <div className='rounded-full w-12 h-12 hover:bg-slate-700 transition flex justify-center items-center'>
                       
                                <Image
                                    className='cursor-pointer dark:invert '
                                    src={bell}
                                    width={40}
                                    height={150}
                                    alt="hamb"
                                />                       
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

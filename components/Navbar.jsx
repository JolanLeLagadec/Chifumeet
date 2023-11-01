import logo from '@/public/logo.png'
import bell from '@/public/bell.svg'
import Image from 'next/image'
import HamburgerMenu from './HamburgerMenu'
import { Button } from './ui/button'

export default function Navbar() {
  return (
    <nav className='bg-background'>
        <div className="flex flex-row justify-between py-4 px-6 ">
            <Image
            className='rounded-[15rem] cursor-pointer'
                priority
                src={logo}
                width={80}
                height={200}
                alt="logo"
             />
            <div className='flex flex-row gap-8 items-center'>
                <Image
                className='cursor-pointer dark:invert '
                    src={bell}
                    width={40}
                    height={150}
                    alt="hamb"
                    />
                <HamburgerMenu />     
            </div>
        </div>
    </nav>
  )
}

"use client"

import useSidebar from '@/store/useSidebar'
import React from 'react'
import { ModeToggle } from '../ui/toggle-dark'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function SidebarMenu({ currentUserId }) {

  const sidebarMenu = useSidebar()
  const sidebarClass = 'w-full transition transform ease-in-out duration-300 absolute bg-background z-50 '

  return (
    <div className={`${sidebarMenu.isOpen ? 'translate-x-0' : '-translate-x-full'}  ${sidebarClass} `}>
      <div className='min-h-[80vh] flex mt-32 px-12  '>
        <ul className='flex flex-col text-4xl space-y-12 mr-24'>
         <Link onClick={() => sidebarMenu.setIsOpen()} href="/duels"><li className='cursor-pointer hover:opacity-60'>Duels</li></Link> 
         <Link onClick={() => sidebarMenu.setIsOpen()} href="/classement"><li className='cursor-pointer hover:opacity-60'>Classement</li></Link> 
         <Link onClick={() => sidebarMenu.setIsOpen()} href="/notifications"><li className='cursor-pointer hover:opacity-60'>Notifications</li></Link>
          <Link onClick={() => sidebarMenu.setIsOpen()} href='/historique'> <li className='cursor-pointer hover:opacity-60'>Historique</li></Link>
          <Link onClick={() => sidebarMenu.setIsOpen()} href='/profile'><li className='cursor-pointer hover:opacity-60'>Mon profil</li></Link>
          <li onClick={() => signOut({callbackUrl: '/'})} className='cursor-pointer hover:opacity-60'>Déconnexion</li>
        </ul>
        <ModeToggle />
        <div className={`${sidebarMenu.isOpen ? 'h-[30rem]' : 'h-0'} ml-24 w-1  bg-blue-500 transition-height ease-in-out duration-700 `}></div>
      </div>
    </div>
  )
}

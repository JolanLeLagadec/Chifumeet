"use client"

import useSidebar from '@/store/useSidebar'
import React from 'react'
import { ModeToggle } from './ui/toggle-dark'
import { signOut } from 'next-auth/react'

export default function SidebarMenu() {
    
    const sidebarMenu = useSidebar()
    const sidebarClass = 'w-full transition transform ease-in-out duration-300 absolute min-h-screen bg-background z-50 '
                        
  return (
    <div className={`${sidebarMenu.isOpen ? 'translate-x-0' : '-translate-x-full'}  ${sidebarClass} `}>
        <div className='min-h-screen flex mt-32 px-12  '>   
            <ul className='flex flex-col text-4xl space-y-12 mr-24'>
                <li className='cursor-pointer hover:opacity-60'>Duels</li>
                <li className='cursor-pointer hover:opacity-60'>Classement</li>
                <li className='cursor-pointer hover:opacity-60'>Notifications</li>
                <li className='cursor-pointer hover:opacity-60'>Historique</li>
                <li className='cursor-pointer hover:opacity-60'>Mon profil</li>
                <li onClick={() => signOut()} className='cursor-pointer hover:opacity-60'>Déconnexion</li>
            </ul>  
            <ModeToggle />
            <div className={`${sidebarMenu.isOpen ? 'h-[30rem]' : 'h-0'} ml-24 w-1  bg-blue-500 transition-height ease-in-out duration-700 `}></div>
            </div>  
    </div>
  )
}

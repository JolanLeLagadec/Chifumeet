'use client'

import useSidebar from "@/store/useSidebar";
import Link from "next/link";

function HamburgerMenu({ user }) {
  
    const sidebarMenu = useSidebar()
    const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-black transition ease transform duration-300  dark:invert`;

    return (
        <div>
        {
                user ?  (         
        <button
            className="flex flex-col h-12 w-12  justify-center items-center group"
            onClick={() => {          
                 sidebarMenu.setIsOpen()
                }}
        >
            <div
                className={`${genericHamburgerLine} ${sidebarMenu.isOpen 
                        ? "rotate-45 translate-y-3  "
                        : ""
                    }`}
            />
            <div
                className={`${genericHamburgerLine} ${sidebarMenu.isOpen ? "opacity-0" : ""
                    }`}
            />
            <div
                className={`${genericHamburgerLine} ${sidebarMenu.isOpen ?
                         "-rotate-45 -translate-y-3  "
                        : ""
                    }`}
            />
        </button>
                ) : ( <div>
                <Link href="/login"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg></Link>
                </div> )
                }
            </div>
    )
}

export default HamburgerMenu
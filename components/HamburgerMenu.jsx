'use client'

import useSidebar from "@/store/useSidebar";
import { useState } from "react"

function HamburgerMenu() {

    const [isOpen, setIsOpen] = useState(false)
    const sidebarMenu = useSidebar()
    const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-black transition ease transform duration-300  dark:invert`;

    return (
        <button
            className="flex flex-col h-12 w-12  justify-center items-center group"
            onClick={() => {
                 setIsOpen(!isOpen)
                 sidebarMenu.setIsOpen()
                }}
        >
            <div
                className={`${genericHamburgerLine} ${isOpen
                        ? "rotate-45 translate-y-3  "
                        : ""
                    }`}
            />
            <div
                className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""
                    }`}
            />
            <div
                className={`${genericHamburgerLine} ${isOpen
                        ? "-rotate-45 -translate-y-3  "
                        : ""
                    }`}
            />
        </button>
    )
}

export default HamburgerMenu
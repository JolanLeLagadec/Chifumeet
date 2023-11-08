import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { epilogue } from '@/app/fonts'

export default function Footer() {
  return (
    <div className={`${epilogue.className} min-h-screen w-full  bg-secondary`}>
        <div className='flex space-between p-14'>
            <div className='flex flex-col w-1/2'>
                <h1 className='font-extrabold text-3xl tracking-[0.1em] text-slate-400'>JOLAN <span className='font-normal text-primary'>&apos;s </span></h1>
                <h1 className='text-xl tracking-widest'>INDUSTRIES</h1>
                <p>Copyright @ 2023 - all right reserved</p>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2  gap-5 mb-2'>
                <h1 className='text-3xl font-extrabold tracking-widest '>SOCIAL</h1>
                <div className='flex flex-row gap-4'>
                <Facebook strokeWidth={1} size={42} />
                <Instagram strokeWidth={1} size={42} />
                <Twitter strokeWidth={1} size={42} />
                </div>
            </div>

        </div>

    </div>
  )
}

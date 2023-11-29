import React from 'react'
import avatar from "../../public/avatar.jpg"
import Image from 'next/image'
import { getOpo } from './actions'

export default async function Duel({ duel, id }) {

    const idOpo = duel.userWonId === id ? duel.userLostId : duel.userWonId
    const oponent = await getOpo(idOpo)
    
    return (
        <div className='flex justify-evenly gap-4 items-center'>
            <Image
                src={oponent.image?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
                width={100}
                height={100}
                alt={oponent.name}
                className='w-16 rounded-full'
            />
            <span>{oponent.name}</span>
            {
                duel.userWonId === id ? (
                    <span className='bg-blue-200 p-3 rounded-full font-semibold dark:text-slate-900'>Win</span>
                ) : (
                    <span className='bg-slate-400 p-3 font-semibold rounded-full dark:text-slate-900'>Lost</span>
                )
            }


        </div>
    )
}

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
            />
            <span>{oponent.name}</span>
            {
                duel.userWonId === id ? (
                    <span>Win</span>
                ) : (
                    <span>Lost</span>
                )
            }


        </div>
    )
}

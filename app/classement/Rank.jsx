import Image from 'next/image'
import React from 'react'
import avatar from "../../public/avatar.jpg"

export default function Rank({ rank }) {
    const { User } = rank
    const { rank: grade, score} = rank

  
    return (
        <div className='flex items-center gap-8 w-full'>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <Image
                    src={User.image?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
                    width={100}
                    height={100}
                    alt={User.name}
                    className='rounded-full'
                />
                <h1 className='text-lg font-sans'>{User.name}</h1>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <span className='text-lg font-semibold'>{score} pts</span>
                <span className='text-xl'>{grade}</span>
            </div>

        </div>
    )
}

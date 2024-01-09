'use client'

import avatar from "../../../../public/avatar.jpg"
import Image from 'next/image'
import ModaleEdit from "./ModaleEdit"
import { Button } from "@/components/ui/button"
import useEditModale from "@/hooks/useModaleEdit"

export default function Content({ bio, name, image, id }) {

    const editModale = useEditModale()


    return (
        <div className='relative flex flex-col justify-center items-center border-1 w-full h-full'>
            <ModaleEdit bio={bio} name={name} image={image} id={id} />
            <div className='flex items-center gap-8 relative'>
                <Image
                    src={image.replace(/^"(.+(?="$))"$/, '$1') || avatar}
                    width={150}
                    height={150}
                    alt={name}
                    className='rounded-lg cursor-pointer'
                />
                <h1>{name}</h1>
                <Button size='sm' variant='ghost' className='border-2 absolute -bottom-10 -right-12' onClick={() => editModale.setIsOpen()}>Modifier</Button>

            </div>
            <div className='mt-6 w-[20rem] h-[15rem] flex justify-center items-center '>
                <p>{bio}</p>
            </div>


        </div>

    )
}

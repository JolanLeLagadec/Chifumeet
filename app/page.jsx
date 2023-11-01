import Image from 'next/image'
import { epilogue, roboto } from './fonts'
import Header from '@/components/Header'
import ButtonSearchOpponents from '@/components/ButtonSearchOpponents'

export default function Home() {
  return (
    <main>
      <Header label='Chifumeet' />
      <div className='p-8 h-full w-full border-t-2 border-primary-game '>
        <div className='flex flex-col justify-center items-center gap-14'>
          <p className={`${epilogue.className} text-5xl font-normal tracking-wider text-center  w-[90%] flex-1 leading-[3rem]`}>Rentre dans l&apos;arène et libère ton potentiel</p>
          <p className=' text-3xl text-center w-[65%] leading-[3rem] text-secondary-foreground'>Sur base de chifumi, rencontre et affronte des joueurs de ton secteur</p>
          <ButtonSearchOpponents />
        </div>
      </div>
    </main>
    
  )
}


import { epilogue } from './fonts'
import Header from '@/components/Header'
import ButtonSearchOpponents from '@/components/ButtonSearchOpponents'
import { useCurrentUser } from '@/hooks/useCurrentUser'



export default async function Home() {

  const user = await useCurrentUser()

  return (

    <main className='relative '>
      <Header label='CHIFUMEET.' />
      <div className='p-8 h-full w-full border-t-2 border-cyan-500  '>
        <div className='relative flex flex-col justify-center items-center gap-14 z-10 '>
          <p className={`${epilogue.className} text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 dark:from-neutral-400 to-neutral-600 dark:to-slate-200 text-6xl font-semibold tracking-wider text-center w-[100%] flex-1 leading-[4,5rem] text-slate-200`}>Rentre dans l&apos;arène et libère ton potentiel</p>
          <p className=' text-3xl text-center w-[60%] leading-[3rem] dark:text-slate-400 text-slate-700'></p>
          <ButtonSearchOpponents user={user} />
        </div>
      </div>
    </main>



  )
}

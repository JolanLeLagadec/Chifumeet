import React from 'react'
import { findUsersRanking } from './findUsersRanking'
import Rank from './Rank'



export default async function Ranking() {

  const ranking = await findUsersRanking()

  const placing = (index) => {
   if(index === 0){
    return <span className='text-xl font-extrabold'>1er</span>
   }
   if(index === 1){
    return <span className='text-xl font-bold'>2e</span>
   }
   if(index === 2){
    return <span className='text-lg font-semibold'>3e</span>
   }
   return <span>{index + 1}</span>
  }


  return (

    <div className='bg-slate-200 w-full min-h-screen dark:bg-slate-800'>
      <div className='flex justify-center items-center w-full h-full p-8'>
        <div className=' bg-slate-50 border-2 border-blue-600 rounded-xl w-full dark:bg-slate-950'>
          {
            ranking.map(( rank, index ) => (
              <div key={rank.id} className=' w-full border-b-1 border-blue-500 p-4 flex items-center gap-4'>
                <div className='w-12'>
                {placing(index)}
                </div>  
                  <Rank key={rank.id} rank={rank} />
              </div>
              
            ))
          }
         
          

        </div>

      </div>

    </div>
  )
}

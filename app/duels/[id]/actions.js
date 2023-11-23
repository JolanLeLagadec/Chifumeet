
'use server'
import prisma from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache';


export const fetchParticipations = async (id) => {
    const duelId = parseInt(id);
    return await prisma.participation.findMany({
      where: {
        duelId
      },
      select: {
        statut: true,
        userId: true,
        User: { 
          select: {
            id: true,
            name: true,
            email: true,
            image: true,     
          }
        }
      }
    });
  }
  

export const updateParticipation = async (id, currentUserId) => { 
    const duelId = parseInt(id)
  const participation = await prisma.participation.findFirst({
    where: {
      duelId,
      userId: currentUserId
  },
  select: {id: true, statut:true}
})
 
  let newStatut;
  if(participation.statut === 'accepted'){
    newStatut = 'started'
  }else {
    newStatut = 'finished'
  }
  
  console.log(participation)
  await prisma.participation.update({
    where: {
      id: participation.id
    },
    data: {statut: newStatut}
  }) 
  revalidatePath('/duels')
}


export const setResults = async (id, userWonId, userLostId) => {

  const duelId = parseInt(id)

  const duel = await prisma.duel.update({
    where: {
      id: duelId
    },
    data: {
      userWonId,
      userLostId,
      participation: { updateMany: {
        where: {
          duelId: duelId,
          userId: { in: [userWonId, userLostId]}
        },
        data: {
          statut: 'finished'
        }
      }}
    }
  })

}




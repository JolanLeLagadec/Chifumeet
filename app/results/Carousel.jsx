'use client'
import { Swiper, SwiperSlide, Scrollbar } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Opponent from './Opponent';
import useChallenge from '@/hooks/useChallenge';
import { useEffect } from 'react';
import { challengeAlreadyExists, duelAlreadyStarted } from './handleChallenge';
import { useState } from 'react'

export default function Carousel({ users, currentUserId }) {

  const [opoInvit, setOpoInvitSent] = useState([])
  const [opoDuel, setOpoInDuel] = useState([])
  const challenge = useChallenge()
  console.log(challenge.ids, 'ici idsssssss')
  console.log(opoInvit, opoDuel)
  
  const idsOpoInvited = opoInvit.map( opo => opo.userId)
  const idsOpoAlreadyInDuel = opoDuel.map(opo => opo.userId)
  const usersIds = users.map(u => u.id)

  console.log(idsOpoInvited, idsOpoAlreadyInDuel)

  useEffect(() => {
    async function isExisting(){
     const opoInvitSent = await challengeAlreadyExists(currentUserId, usersIds)
     const opoInDuel = await duelAlreadyStarted(currentUserId, usersIds)
     setOpoInvitSent(opoInvitSent)
     setOpoInDuel(opoInDuel)
    }
    isExisting()
  }, [])

  return (
    <Swiper
      modules={Scrollbar}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
   {users.filter(user => !idsOpoInvited.includes(user.id) || !idsOpoAlreadyInDuel.includes(user.id))
            .map((user) => (
              <SwiperSlide key={user.id}> 
              {
                !challenge.ids.includes(user.id) && (
                  <Opponent currentUserId={currentUserId} user={user} /> 
                )
                        }                           
              </SwiperSlide>
      ))}  
    </Swiper>
  )
}

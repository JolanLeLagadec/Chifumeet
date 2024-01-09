'use client'
import { Swiper, SwiperSlide, Scrollbar } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Opponent from './Opponent';
import useChallenge from '@/hooks/useChallenge';
import { useEffect } from 'react';
import { challengeAlreadyExists, duelAlreadyStarted } from '../_actions/handleChallenge';
import { useState } from 'react'

export default function Carousel({ users, currentUserId }) {

  const [opoInvit, setOpoInvitSent] = useState([])
  const [opoDuel, setOpoInDuel] = useState([])
  const challenge = useChallenge()

  const idsOpoInvited = opoInvit.map(opo => opo.userId)
  const idsOpoAlreadyInDuel = opoDuel.map(opo => opo.userId)
  const usersIds = users.map(u => u.id)

  useEffect(() => {
    async function isExisting() {
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
      {users.filter(user => !idsOpoInvited.includes(user.id) && !idsOpoAlreadyInDuel.includes(user.id))

        // Pour que les changements se reflètent immédiatement, on stock les ids de ceux défier dans un store global
        // Au lieu de mettre la condition dans le filter, on la met dans le map. filter détermine le rendu initial, tandis que map est abonné aux chgmts, donc se met à jour si l'état/la condition n'est plus respectée.
        .map((user) => (
          <>
            {
              !challenge.ids.includes(user.id) && (
                <SwiperSlide key={user.id}>
                  <Opponent currentUserId={currentUserId} user={user} />
                </SwiperSlide>
              )
            }
          </>
        ))}
    </Swiper>
  )
}

'use client'
import { Swiper, SwiperSlide, Scrollbar } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Opponent from './Opponent';
import { ArrowBigLeft } from 'lucide-react';

export default function Carousel({ data, currentUserId }) {
  return (
    <Swiper
        modules={Scrollbar}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
    {
        data.map((user) => (
            <>
            
            <SwiperSlide key={user.id}>
                <Opponent currentUserId={currentUserId} user={user} />
            </SwiperSlide>
            </>
        )

        )
    }
     
    </Swiper>
  )
}

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'
import image from '../../public/image2.png'
import image2 from '../../public/image.png'
  
  

const Slider = () => {
  return (
    <div>
        <Carousel>
  <CarouselContent>
    <CarouselItem><Image src={image} width={1000} height={300} className='w-full    h-[300px] md:h-[500px] object-cover rounded-2xl' alt='drinks'/></CarouselItem>
    <CarouselItem><Image src={image2} width={1000} height={300} className='w-full   h-[300px] md:h-[500px] object-cover rounded-2xl' alt='drinks'/></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

    </div>
  )
}

export default Slider